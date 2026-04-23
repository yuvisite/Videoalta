const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const ROOT_DIR = __dirname;
const VIDEO_DIR = ROOT_DIR;
const DATA_DIR = path.join(VIDEO_DIR, 'data');
const DATA_FILE = path.join(DATA_DIR, 'video-data.json');
const PORT = Number(process.env.PORT || 8787);
const YOUTUBE_API_KEY = (process.env.YOUTUBE_API_KEY || '').trim();
const SEARCH_CACHE_TTL_MS = 5 * 60 * 1000;
const SEARCH_CACHE_MAX_ENTRIES = Number(process.env.SEARCH_CACHE_MAX_ENTRIES || 200);
const OUTBOUND_FETCH_TIMEOUT_MS = Number(process.env.OUTBOUND_FETCH_TIMEOUT_MS || 8000);
const REFRESH_MAX_SUBSCRIPTIONS = Number(process.env.REFRESH_MAX_SUBSCRIPTIONS || 0);
const MAX_STORED_VIDEOS = Number(process.env.MAX_STORED_VIDEOS || 0);
const REFRESH_CHANNEL_PAGES = Number(process.env.REFRESH_CHANNEL_PAGES || 3);
const MAX_VIDEOS_PER_CHANNEL = Number(process.env.MAX_VIDEOS_PER_CHANNEL || 72);
const IMPORT_MAX_VALUES = Number(process.env.IMPORT_MAX_VALUES || 500);

const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store'
};

const searchCache = new Map();

function ensureDataFile() {
  fs.mkdirSync(DATA_DIR, { recursive: true });

  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(
      DATA_FILE,
      JSON.stringify({ subscriptions: [], videos: [], updatedAt: null }, null, 2),
      'utf8'
    );
  }
}

function loadState() {
  ensureDataFile();

  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return {
      subscriptions: Array.isArray(parsed.subscriptions) ? parsed.subscriptions : [],
      videos: Array.isArray(parsed.videos) ? parsed.videos : [],
      updatedAt: parsed.updatedAt || null
    };
  } catch (error) {
    return { subscriptions: [], videos: [], updatedAt: null };
  }
}

function saveState(state) {
  ensureDataFile();
  fs.writeFileSync(
    DATA_FILE,
    JSON.stringify(
      {
        subscriptions: Array.isArray(state.subscriptions) ? state.subscriptions : [],
        videos: Array.isArray(state.videos) ? state.videos : [],
        updatedAt: state.updatedAt || null
      },
      null,
      2
    ),
    'utf8'
  );
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, JSON_HEADERS);
  res.end(JSON.stringify(payload));
}

function notFound(res) {
  sendJson(res, 404, { error: 'Not found' });
}

function isTrustedMutationRequest(req) {
  // CSRF mitigation: if browser sends `Origin`/`Referer`, ensure it's our own origin.
  // For same-origin requests browsers often omit these headers, so we fail open there.
  const host = req.headers.host;
  if (!host) {
    return true;
  }

  const expectedHttp = `http://${host}`;
  const expectedHttps = `https://${host}`;

  const origin = req.headers.origin;
  if (origin) {
    return origin === expectedHttp || origin === expectedHttps;
  }

  const referer = req.headers.referer;
  if (referer) {
    try {
      const url = new URL(referer);
      return url.origin === expectedHttp || url.origin === expectedHttps;
    } catch (error) {
      // Ignore malformed referer.
    }
  }

  return true;
}

function decodeXml(value) {
  return String(value || '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)));
}

function stripTags(value) {
  return decodeXml(String(value || '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function firstMatch(text, pattern) {
  const match = pattern.exec(text);
  return match ? match[1] : '';
}

function uniqueBy(items, getKey) {
  const seen = new Set();
  return items.filter((item) => {
    const key = getKey(item);
    if (!key || seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function detectCsvDelimiter(line) {
  const commaCount = (String(line || '').match(/,/g) || []).length;
  const semicolonCount = (String(line || '').match(/;/g) || []).length;
  return semicolonCount > commaCount ? ';' : ',';
}

function parseCsvLine(line, delimiter = ',') {
  const cells = [];
  let current = '';
  let insideQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const nextChar = line[index + 1];

    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        current += '"';
        index += 1;
      } else {
        insideQuotes = !insideQuotes;
      }
      continue;
    }

    if (char === delimiter && !insideQuotes) {
      cells.push(current);
      current = '';
      continue;
    }

    current += char;
  }

  cells.push(current);
  return cells.map((cell) => cell.trim());
}

function parseCsv(text) {
  const lines = String(text || '')
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .filter((line) => line.trim());

  if (!lines.length) {
    return [];
  }

  const delimiter = detectCsvDelimiter(lines[0]);
  const headers = parseCsvLine(lines[0], delimiter).map((header) => header.toLowerCase());

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line, delimiter);
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    return row;
  });
}

function normalizeInputValue(value) {
  return String(value || '').trim();
}

function normalizeYoutubeChannelUrl(value) {
  const trimmed = normalizeInputValue(value);

  if (!trimmed) {
    return '';
  }

  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://www.youtube.com/${trimmed.replace(/^\/+/, '')}`;

  try {
    const url = new URL(withProtocol);
    const hostname = String(url.hostname || '').toLowerCase();

    // Security: allow outbound requests only to YouTube domains.
    // This prevents SSRF via user-provided "http(s)://..." values.
    const isYouTubeHost = hostname === 'youtube.com' || hostname.endsWith('.youtube.com');
    if (!isYouTubeHost) {
      return '';
    }

    const cleanedPath = url.pathname
      .replace(/\/(videos|featured|streams|shorts|playlists|community|about)\/?$/i, '')
      .replace(/\/+$/, '');

    url.search = '';
    url.hash = '';
    url.pathname = cleanedPath || '/';
    return url.toString();
  } catch (error) {
    // Fail closed: if we can't parse the URL safely, treat it as invalid.
    return '';
  }
}

function extractChannelIdFromUrl(value) {
  return (
    firstMatch(value, /youtube\.com\/channel\/(UC[\w-]{22})/i) ||
    firstMatch(value, /channel_id=(UC[\w-]{22})/i) ||
    ''
  );
}

function extractChannelIdFromHtml(html) {
  return (
    firstMatch(html, /<meta[^>]+itemprop="channelId"[^>]+content="(UC[\w-]{22})"/i) ||
    firstMatch(html, /"externalId":"(UC[\w-]{22})"/i) ||
    firstMatch(html, /"channelId":"(UC[\w-]{22})"/i) ||
    firstMatch(html, /"browseId":"(UC[\w-]{22})"/i) ||
    firstMatch(html, /youtube\.com\/channel\/(UC[\w-]{22})/i) ||
    firstMatch(html, /channelId=(UC[\w-]{22})/i) ||
    ''
  );
}

function decodeJsonString(value) {
  const trimmed = String(value || '');
  if (!trimmed) {
    return '';
  }

  try {
    return JSON.parse(`"${trimmed}"`);
  } catch (error) {
    return decodeXml(trimmed)
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r')
      .replace(/\\t/g, '\t')
      .replace(/\\\//g, '/')
      .replace(/\\u0026/gi, '&')
      .replace(/\\\\/g, '\\');
  }
}

function isYoutubeVideoHost(hostname) {
  return (
    hostname === 'youtu.be' ||
    hostname.endsWith('.youtu.be') ||
    hostname === 'youtube.com' ||
    hostname.endsWith('.youtube.com') ||
    hostname === 'youtube-nocookie.com' ||
    hostname.endsWith('.youtube-nocookie.com')
  );
}

function extractVideoId(value) {
  const trimmed = normalizeInputValue(value);

  if (!trimmed) {
    return '';
  }

  if (/^[\w-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  const protocolReady = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : /(?:^|\/)(?:www\.)?(?:youtube\.com|youtu\.be|youtube-nocookie\.com)\b/i.test(trimmed)
      ? `https://${trimmed.replace(/^\/+/, '')}`
      : '';

  if (protocolReady) {
    try {
      const url = new URL(protocolReady);
      const hostname = String(url.hostname || '').toLowerCase();
      if (!isYoutubeVideoHost(hostname)) {
        return '';
      }

      const queryId = normalizeInputValue(url.searchParams.get('v') || url.searchParams.get('vi') || '');
      if (/^[\w-]{11}$/.test(queryId)) {
        return queryId;
      }

      const segments = url.pathname.split('/').filter(Boolean);
      const markerIndex = segments.findIndex((segment) => /^(embed|shorts|live|v)$/i.test(segment));
      if (markerIndex >= 0) {
        const segmentId = normalizeInputValue(segments[markerIndex + 1] || '');
        if (/^[\w-]{11}$/.test(segmentId)) {
          return segmentId;
        }
      }

      if ((hostname === 'youtu.be' || hostname.endsWith('.youtu.be')) && segments[0] && /^[\w-]{11}$/.test(segments[0])) {
        return segments[0];
      }
    } catch (error) {
      // Fall through to regex extraction.
    }
  }

  return firstMatch(trimmed, /(?:v=|vi=|youtu\.be\/|embed\/|shorts\/|live\/)([\w-]{11})/i) || '';
}

function buildVideoUrl(videoId) {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

function buildShortsUrl(videoId) {
  return `https://www.youtube.com/shorts/${videoId}`;
}

function buildEmbedUrl(videoId) {
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`;
}

function buildChannelVideosUrl(channelId) {
  const params = new URLSearchParams({
    view: '0',
    sort: 'dd',
    shelf_id: '0',
    hl: 'en',
    persist_hl: '1'
  });
  return `https://www.youtube.com/channel/${encodeURIComponent(channelId)}/videos?${params.toString()}`;
}

function appendYoutubeLocale(urlValue) {
  try {
    const url = new URL(urlValue);
    url.searchParams.set('hl', 'en');
    url.searchParams.set('persist_hl', '1');
    return url.toString();
  } catch (error) {
    return urlValue;
  }
}

async function fetchText(url) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), OUTBOUND_FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) TuuDayVideo/1.0',
        'Accept-Language': 'ru,en;q=0.9'
      },
      signal: controller.signal
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} for ${url}`);
    }

    return response.text();
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchJson(url) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), OUTBOUND_FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) TuuDayVideo/1.0',
        'Accept-Language': 'ru,en;q=0.9'
      },
      signal: controller.signal
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`HTTP ${response.status} for ${url}: ${body}`);
    }

    return response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

function parseFeed(xml) {
  const feedTitle = stripTags(firstMatch(xml, /<feed\b[\s\S]*?<title>([\s\S]*?)<\/title>/i))
    .replace(/^YouTube Videos from\s+/i, '');
  const entries = xml.match(/<entry\b[\s\S]*?<\/entry>/gi) || [];

  return {
    title: feedTitle,
    videos: entries.map((entry) => {
      const videoId = stripTags(firstMatch(entry, /<yt:videoId>([\s\S]*?)<\/yt:videoId>/i));
      const videoUrl = decodeXml(firstMatch(entry, /<link[^>]+href="([^"]+)"/i));

      return {
        id: videoId,
        channelId: stripTags(firstMatch(entry, /<yt:channelId>([\s\S]*?)<\/yt:channelId>/i)),
        channelTitle: stripTags(firstMatch(entry, /<author>\s*<name>([\s\S]*?)<\/name>/i)),
        title: stripTags(firstMatch(entry, /<title>([\s\S]*?)<\/title>/i)),
        publishedAt: stripTags(firstMatch(entry, /<published>([\s\S]*?)<\/published>/i)),
        description: stripTags(firstMatch(entry, /<media:description>([\s\S]*?)<\/media:description>/i)),
        videoUrl: videoUrl || `https://www.youtube.com/watch?v=${videoId}`,
        embedUrl: buildEmbedUrl(videoId),
        thumbnail:
          decodeXml(firstMatch(entry, /<media:thumbnail[^>]+url="([^"]+)"/i)) ||
          `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
      };
    }).filter((video) => video.id)
  };
}

function extractAssignedJson(html, variableName) {
  const source = String(html || '');
  const markers = [
    `var ${variableName} = `,
    `window["${variableName}"] = `,
    `window['${variableName}'] = `
  ];

  for (const marker of markers) {
    const markerIndex = source.indexOf(marker);
    if (markerIndex < 0) {
      continue;
    }

    const startIndex = source.indexOf('{', markerIndex + marker.length);
    if (startIndex < 0) {
      continue;
    }

    let depth = 0;
    let insideString = false;
    let escaped = false;

    for (let index = startIndex; index < source.length; index += 1) {
      const char = source[index];

      if (insideString) {
        if (escaped) {
          escaped = false;
        } else if (char === '\\') {
          escaped = true;
        } else if (char === '"') {
          insideString = false;
        }
        continue;
      }

      if (char === '"') {
        insideString = true;
        continue;
      }

      if (char === '{') {
        depth += 1;
        continue;
      }

      if (char === '}') {
        depth -= 1;
        if (depth === 0) {
          return source.slice(startIndex, index + 1);
        }
      }
    }
  }

  return '';
}

function parseYoutubeInitialData(html) {
  const raw = extractAssignedJson(html, 'ytInitialData');
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
}

function parseYoutubePlayerResponse(html) {
  const raw = extractAssignedJson(html, 'ytInitialPlayerResponse');
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
}

function walkJsonTree(root, visit) {
  const stack = [root];

  while (stack.length) {
    const current = stack.pop();
    if (!current || typeof current !== 'object') {
      continue;
    }

    visit(current);

    if (Array.isArray(current)) {
      for (let index = current.length - 1; index >= 0; index -= 1) {
        stack.push(current[index]);
      }
      continue;
    }

    const values = Object.values(current);
    for (let index = values.length - 1; index >= 0; index -= 1) {
      stack.push(values[index]);
    }
  }
}

function findRendererNode(root, key) {
  let found = null;

  walkJsonTree(root, (node) => {
    if (!found && !Array.isArray(node) && node[key] && typeof node[key] === 'object') {
      found = node[key];
    }
  });

  return found;
}

function collectRendererNodes(root, key) {
  const items = [];

  walkJsonTree(root, (node) => {
    if (!Array.isArray(node) && node[key] && typeof node[key] === 'object') {
      items.push(node[key]);
    }
  });

  return items;
}

function readTextRuns(value) {
  if (!value) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => readTextRuns(item)).filter(Boolean).join('');
  }

  if (typeof value.text === 'string') {
    return value.text;
  }

  if (typeof value.simpleText === 'string') {
    return value.simpleText;
  }

  if (Array.isArray(value.runs)) {
    return value.runs.map((run) => readTextRuns(run)).filter(Boolean).join('');
  }

  return '';
}

function pickThumbnailUrl(value, fallback = '') {
  const thumbnails = Array.isArray(value)
    ? value
    : value && Array.isArray(value.thumbnails)
      ? value.thumbnails
      : [];
  const chosen = thumbnails[thumbnails.length - 1] || thumbnails[0] || {};
  const url = decodeXml(chosen.url || '');
  return url || fallback;
}

function findBrowseId(value) {
  let browseId = '';

  walkJsonTree(value, (node) => {
    if (browseId || Array.isArray(node)) {
      return;
    }

    const candidate = normalizeInputValue(
      node.browseId ||
      (node.browseEndpoint && node.browseEndpoint.browseId) ||
      (node.navigationEndpoint && node.navigationEndpoint.browseEndpoint && node.navigationEndpoint.browseEndpoint.browseId) ||
      ''
    );

    if (/^UC[\w-]{22}$/.test(candidate)) {
      browseId = candidate;
    }
  });

  return browseId;
}

function parseEnglishRelativeTime(value) {
  const raw = normalizeInputValue(value).toLowerCase();
  if (!raw) {
    return '';
  }

  const normalized = raw
    .replace(/\b(streamed|premiered|updated)\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!normalized) {
    return '';
  }

  if (normalized === 'today') {
    return new Date().toISOString();
  }

  if (normalized === 'yesterday') {
    return new Date(Date.now() - (24 * 60 * 60 * 1000)).toISOString();
  }

  const match = normalized.match(/\b(\d+|a|an)\s+(second|minute|hour|day|week|month|year)s?\s+ago\b/);
  if (!match) {
    return '';
  }

  const amount = match[1] === 'a' || match[1] === 'an' ? 1 : Number(match[1]);
  const unitsMs = {
    second: 1000,
    minute: 60 * 1000,
    hour: 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    year: 365 * 24 * 60 * 60 * 1000
  };
  const unitMs = unitsMs[match[2]] || 0;

  if (!amount || !unitMs) {
    return '';
  }

  return new Date(Date.now() - (amount * unitMs)).toISOString();
}

function mapVideoRendererToVideo(videoRenderer, fallbackChannel) {
  const videoId = normalizeInputValue(videoRenderer && videoRenderer.videoId);
  if (!videoId) {
    return null;
  }
  const availability = parseVideoAvailabilityFromRenderer(videoRenderer);

  const publishedText = readTextRuns(videoRenderer.publishedTimeText);
  const durationText = readTextRuns(
    Array.isArray(videoRenderer.thumbnailOverlays)
      ? (videoRenderer.thumbnailOverlays.find((overlay) => overlay && overlay.thumbnailOverlayTimeStatusRenderer) || {}).thumbnailOverlayTimeStatusRenderer &&
          (videoRenderer.thumbnailOverlays.find((overlay) => overlay && overlay.thumbnailOverlayTimeStatusRenderer) || {}).thumbnailOverlayTimeStatusRenderer.text
      : ''
  );
  const description =
    readTextRuns(videoRenderer.descriptionSnippet) ||
    readTextRuns(
      videoRenderer.detailedMetadataSnippets &&
      videoRenderer.detailedMetadataSnippets[0] &&
      videoRenderer.detailedMetadataSnippets[0].snippetText
    ) ||
    '';

  return {
    id: videoId,
    channelId:
      findBrowseId(
        videoRenderer.ownerText ||
        videoRenderer.longBylineText ||
        videoRenderer.shortBylineText ||
        videoRenderer
      ) ||
      fallbackChannel.channelId ||
      '',
    channelTitle:
      readTextRuns(videoRenderer.ownerText || videoRenderer.longBylineText || videoRenderer.shortBylineText) ||
      fallbackChannel.title ||
      fallbackChannel.channelId ||
      '',
    title: readTextRuns(videoRenderer.title) || videoId,
    publishedAt: parseEnglishRelativeTime(publishedText) || publishedText || '',
    description,
    durationText,
    durationSeconds: parseTimestampSeconds(durationText),
    videoUrl: buildVideoUrl(videoId),
    embedUrl: buildEmbedUrl(videoId),
    thumbnail: pickThumbnailUrl(videoRenderer.thumbnail, `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`),
    isMembersOnly: availability.isMembersOnly,
    isPlayable: availability.isPlayable,
    playabilityStatus: availability.playabilityStatus,
    playabilityReason: availability.playabilityReason
  };
}

function parseTimestampSeconds(value) {
  const parts = String(value || '').trim().split(':').map((part) => Number(part));

  if (!parts.length || parts.some((part) => Number.isNaN(part))) {
    return 0;
  }

  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }

  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }

  if (parts.length === 1) {
    return parts[0];
  }

  return 0;
}

function parseIsoDurationToSeconds(value) {
  const input = String(value || '').trim().toUpperCase();
  if (!input) {
    return 0;
  }

  const match = input.match(/^P(?:([\d.]+)D)?(?:T(?:([\d.]+)H)?(?:([\d.]+)M)?(?:([\d.]+)S)?)?$/);
  if (!match) {
    return 0;
  }

  const days = Number(match[1] || 0);
  const hours = Number(match[2] || 0);
  const minutes = Number(match[3] || 0);
  const seconds = Number(match[4] || 0);

  return Math.round((((days * 24) + hours) * 60 + minutes) * 60 + seconds);
}

function sortVideosNewestFirst(videos) {
  return (videos || [])
    .map((video, index) => {
      const timestamp = Date.parse(video.publishedAt || '');
      return {
        video,
        index,
        timestamp: Number.isNaN(timestamp) ? null : timestamp
      };
    })
    .sort((left, right) => {
      if (left.timestamp !== null && right.timestamp !== null) {
        return right.timestamp - left.timestamp;
      }
      if (right.timestamp !== null) {
        return 1;
      }
      if (left.timestamp !== null) {
        return -1;
      }
      return left.index - right.index;
    })
    .map((item) => item.video);
}

function hasShortsMarker(text) {
  return /#[^\s#]*shorts\b/i.test(String(text || ''));
}

function collectRendererStrings(value) {
  const texts = [];

  walkJsonTree(value, (node) => {
    if (!node || typeof node !== 'object' || Array.isArray(node)) {
      return;
    }

    const readableText =
      (Object.prototype.hasOwnProperty.call(node, 'simpleText') ||
        Object.prototype.hasOwnProperty.call(node, 'text') ||
        Array.isArray(node.runs))
        ? normalizeInputValue(readTextRuns(node))
        : '';

    const candidates = [
      readableText,
      normalizeInputValue(node.label),
      normalizeInputValue(node.tooltip),
      normalizeInputValue(node.style),
      normalizeInputValue(node.iconType),
      normalizeInputValue(node.accessibilityData && node.accessibilityData.label),
      normalizeInputValue(node.icon && node.icon.iconType)
    ];

    candidates.forEach((candidate) => {
      if (candidate) {
        texts.push(candidate);
      }
    });
  });

  return uniqueBy(texts, (text) => text);
}

function isMembersOnlyReason(value) {
  const text = String(value || '').toLowerCase();
  if (!text) {
    return false;
  }

  return (
    text.includes('badge_style_type_members_only') ||
    text.includes('sponsorship_star') ||
    text.includes('members first') ||
    text.includes('members only') ||
    text.includes("available to this channel's members") ||
    text.includes('channel members') ||
    text.includes('join this channel') ||
    text.includes('exclusive for members') ||
    text.includes('спонсор') ||
    text.includes('спонсорство') ||
    text.includes('для спонсор') ||
    text.includes('только спонсор') ||
    text.includes('участник канала') ||
    text.includes('участникам канала')
  );
}

function isUnavailablePlayabilityStatus(status, reason) {
  const normalizedStatus = normalizeInputValue(status).toUpperCase();
  if (!normalizedStatus || normalizedStatus === 'OK') {
    return false;
  }

  return true;
}

function parseVideoAvailabilityFromRenderer(videoRenderer) {
  const texts = collectRendererStrings([
    videoRenderer && videoRenderer.badges,
    videoRenderer && videoRenderer.thumbnailOverlays,
    videoRenderer && videoRenderer.thumbnailOverlayBadgeViewModel
  ]);
  const reason = texts.find((text) => isMembersOnlyReason(text)) || '';
  const isMembersOnly = Boolean(reason);

  return {
    isMembersOnly,
    isPlayable: !isMembersOnly,
    playabilityStatus: isMembersOnly ? 'UNPLAYABLE' : '',
    playabilityReason: reason || (isMembersOnly ? 'Members only' : '')
  };
}

function isLikelyShortVideo(video) {
  const url = String(video && video.videoUrl || '').toLowerCase();
  const title = String(video && video.title || '');
  const description = String(video && video.description || '');

  return Boolean(video && video.isShort) ||
    url.includes('/shorts/') ||
    hasShortsMarker(title) ||
    hasShortsMarker(description);
}

function shouldVerifyShortCandidate(video, state) {
  if (!video || !video.id) {
    return false;
  }

  if (typeof video.isShort === 'boolean') {
    return false;
  }

  if (isLikelyShortVideo(video)) {
    return true;
  }

  const knownVideo = (state && state.videos || []).find((item) => item.id === video.id);
  if (knownVideo && typeof knownVideo.isShort === 'boolean') {
    return false;
  }

  const durationSeconds = Number(video.durationSeconds || 0);
  return durationSeconds > 0 && durationSeconds <= 190;
}

function shouldExcludeVideoFromFeed(video) {
  return Boolean(
    !video ||
    isLikelyShortVideo(video) ||
    video.isMembersOnly ||
    video.isPlayable === false ||
    isUnavailablePlayabilityStatus(video.playabilityStatus, video.playabilityReason)
  );
}

async function resolveVideoFlags(video, state) {
  if (!video || !video.id) {
    return video;
  }

  const knownVideo = (state && state.videos || []).find((item) => item.id === video.id);
  const resolvedVideo = {
    ...video,
    isShort:
      typeof video.isShort === 'boolean'
        ? video.isShort
        : knownVideo && typeof knownVideo.isShort === 'boolean'
          ? knownVideo.isShort
          : undefined,
    isMembersOnly:
      typeof video.isMembersOnly === 'boolean'
        ? video.isMembersOnly
        : knownVideo && typeof knownVideo.isMembersOnly === 'boolean'
          ? knownVideo.isMembersOnly
          : false,
    isPlayable:
      typeof video.isPlayable === 'boolean'
        ? video.isPlayable
        : knownVideo && typeof knownVideo.isPlayable === 'boolean'
          ? knownVideo.isPlayable
          : undefined,
    playabilityStatus: video.playabilityStatus || (knownVideo && knownVideo.playabilityStatus) || '',
    playabilityReason: video.playabilityReason || (knownVideo && knownVideo.playabilityReason) || ''
  };

  if (shouldExcludeVideoFromFeed(resolvedVideo) && typeof resolvedVideo.isShort === 'boolean') {
    return {
      ...resolvedVideo,
      videoUrl: resolvedVideo.isShort ? buildShortsUrl(video.id) : (resolvedVideo.videoUrl || buildVideoUrl(video.id))
    };
  }

  if (!shouldVerifyShortCandidate(resolvedVideo, state)) {
    return {
      ...resolvedVideo,
      isShort: Boolean(resolvedVideo.isShort),
      isPlayable:
        typeof resolvedVideo.isPlayable === 'boolean'
          ? resolvedVideo.isPlayable
          : !Boolean(resolvedVideo.isMembersOnly),
      videoUrl: resolvedVideo.isShort ? buildShortsUrl(video.id) : (resolvedVideo.videoUrl || buildVideoUrl(video.id))
    };
  }

  try {
    const details = await fetchVideoDetailsFallback(video.id, state);
    return {
      ...resolvedVideo,
      isShort: Boolean(details.isShort),
      isMembersOnly: Boolean(details.isMembersOnly || resolvedVideo.isMembersOnly),
      isPlayable:
        typeof details.isPlayable === 'boolean'
          ? details.isPlayable
          : (typeof resolvedVideo.isPlayable === 'boolean' ? resolvedVideo.isPlayable : !Boolean(details.isMembersOnly || resolvedVideo.isMembersOnly)),
      playabilityStatus: details.playabilityStatus || resolvedVideo.playabilityStatus || '',
      playabilityReason: details.playabilityReason || resolvedVideo.playabilityReason || '',
      videoUrl: details.videoUrl || resolvedVideo.videoUrl || buildVideoUrl(video.id)
    };
  } catch (error) {
    return {
      ...resolvedVideo,
      isShort: isLikelyShortVideo(resolvedVideo),
      isPlayable:
        typeof resolvedVideo.isPlayable === 'boolean'
          ? resolvedVideo.isPlayable
          : !Boolean(resolvedVideo.isMembersOnly),
      videoUrl: isLikelyShortVideo(resolvedVideo) ? buildShortsUrl(video.id) : (resolvedVideo.videoUrl || buildVideoUrl(video.id))
    };
  }
}

function parseChannelAvatarFromHtml(html) {
  const directMeta =
    decodeXml(firstMatch(html, /<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i)) ||
    decodeXml(firstMatch(html, /<meta[^>]+content="([^"]+)"[^>]+property="og:image"/i));

  if (directMeta) {
    return directMeta;
  }

  const jsonAvatar = decodeXml(firstMatch(html, /"avatar"\s*:\s*\{[\s\S]*?"url"\s*:\s*"([^"]+)"/i)).replace(/\\\//g, '/');
  return jsonAvatar || '';
}

async function fetchChannelAvatar(channelId) {
  try {
    const html = await fetchText(`https://www.youtube.com/channel/${encodeURIComponent(channelId)}`);
    return parseChannelAvatarFromHtml(html);
  } catch (error) {
    return '';
  }
}

async function fetchFeedForChannel(channelId) {
  const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const xml = await fetchText(feedUrl);
  const parsed = parseFeed(xml);
  return { feedUrl, channelId, title: parsed.title, videos: parsed.videos };
}

async function resolveChannelInput(input) {
  const value = normalizeInputValue(input);

  if (!value) {
    throw new Error('Enter a channel link, channel ID, or @handle.');
  }

  const directChannelId = /^UC[\w-]{22}$/.test(value) ? value : extractChannelIdFromUrl(value);

  if (directChannelId) {
    let payload;
    try {
      payload = await fetchChannelPageRss(directChannelId, { subscriptions: [], videos: [] });
    } catch (error) {
      payload = await fetchChannelPageFallback(directChannelId, { subscriptions: [], videos: [] });
    }

    return {
      channelId: directChannelId,
      channelTitle: (payload.channel && payload.channel.title) || directChannelId,
      source: value,
      feedUrl: buildChannelVideosUrl(directChannelId),
      channelThumbnail: (payload.channel && payload.channel.thumbnail) || '',
      previewVideo: (payload.videos && payload.videos[0]) || null
    };
  }

  const maybeUrl = value.startsWith('@')
    ? normalizeYoutubeChannelUrl(`https://www.youtube.com/${value}`)
    : normalizeYoutubeChannelUrl(value);

  if (!maybeUrl) {
    throw new Error('Only YouTube channel URLs/handles are allowed.');
  }

  const html = await fetchText(appendYoutubeLocale(maybeUrl));
  const rssHref =
    decodeXml(firstMatch(html, /<link[^>]+rel="alternate"[^>]+type="application\/atom\+xml"[^>]+href="([^"]+)"/i)) ||
    decodeXml(firstMatch(html, /<link[^>]+type="application\/atom\+xml"[^>]+href="([^"]+)"/i));
  const channelId = extractChannelIdFromUrl(rssHref) || extractChannelIdFromHtml(html);

  if (!channelId) {
    throw new Error('Could not determine channel ID. Try the channel root URL without /videos or /featured, or paste youtube.com/channel/UC... or @handle.');
  }

  let payload;
  try {
    payload = await fetchChannelPageRss(channelId, { subscriptions: [], videos: [] });
  } catch (error) {
    payload = await fetchChannelPageFallback(channelId, { subscriptions: [], videos: [] });
  }

  const pageTitle = stripTags(firstMatch(html, /<title>([\s\S]*?)<\/title>/i)).replace(/\s*-\s*YouTube\s*$/i, '');
  const channelThumbnail = (payload.channel && payload.channel.thumbnail) || parseChannelAvatarFromHtml(html);

  return {
    channelId,
    channelTitle: (payload.channel && payload.channel.title) || pageTitle || channelId,
    source: value,
    feedUrl: buildChannelVideosUrl(channelId),
    channelThumbnail,
    previewVideo: (payload.videos && payload.videos[0]) || null
  };
}

function summarizeSubscription(subscription, videos) {
  const newestVideo = videos[0] || null;
  return {
    ...subscription,
    lastCheckedAt: new Date().toISOString(),
    lastVideoAt: newestVideo ? newestVideo.publishedAt : subscription.lastVideoAt || null,
    thumbnail: subscription.thumbnail || ''
  };
}

let isRefreshing = false;
let refreshProgress = { current: 0, total: 0 };
let refreshErrors = [];

async function runBackgroundRefresh() {
  if (isRefreshing) return { status: 'already_running', progress: refreshProgress };
  isRefreshing = true;
  refreshErrors = [];

  // We use setTimeout to ensure the function returns immediately to the client
  // before starting the heavy processing, preventing the UI from getting stuck on "Запуск..."
  setTimeout(async () => {
    try {
      const state = loadState();
      const nextVideos = [];
      const nextSubscriptions = [];

      const subscriptions = Array.isArray(state.subscriptions) ? state.subscriptions : [];
      const max = Number(REFRESH_MAX_SUBSCRIPTIONS);
      const effectiveList = max > 0 ? subscriptions.slice(0, max) : subscriptions;
      const untouchedSubscriptions = max > 0 ? subscriptions.slice(max) : [];

      refreshProgress = { current: 0, total: effectiveList.length };

      if (effectiveList.length !== subscriptions.length) {
        refreshErrors.push({
          channelId: null,
          message: `Too many subscriptions: truncated to ${effectiveList.length}`
        });
      }

      // Process subscriptions in parallel batches
      const BATCH_SIZE = 5;
      for (let i = 0; i < effectiveList.length; i += BATCH_SIZE) {
        const batch = effectiveList.slice(i, i + BATCH_SIZE);
        const results = await Promise.all(
          batch.map(async (subscription) => {
            try {
              const payload = await fetchChannelVideosForRefresh(subscription.channelId, state);
              const channel = payload.channel || {};
              const videos = (payload.videos || [])
                .map((video) => ({
                  ...video,
                  channelId: subscription.channelId,
                  channelTitle: video.channelTitle || channel.title || subscription.channelTitle
                }))
                .filter((video) => !shouldExcludeVideoFromFeed(video));

              return {
                type: 'success',
                subscription: summarizeSubscription(
                  {
                    ...subscription,
                    channelTitle: channel.title || subscription.channelTitle,
                    thumbnail: channel.thumbnail || subscription.thumbnail || '',
                    feedUrl: buildChannelVideosUrl(subscription.channelId),
                    lastError: ''
                  },
                  videos
                ),
                videos
              };
            } catch (error) {
              return {
                type: 'error',
                channelId: subscription.channelId,
                message: error.message,
                subscription: {
                  ...subscription,
                  lastCheckedAt: new Date().toISOString(),
                  lastError: error.message
                }
              };
            }
          })
        );

        for (const res of results) {
          if (res.type === 'success') {
            nextVideos.push(...res.videos);
            nextSubscriptions.push(res.subscription);
          } else {
            refreshErrors.push({ channelId: res.channelId, message: res.message });
            nextSubscriptions.push(res.subscription);
          }
        }
        
        refreshProgress.current += batch.length;
      }

      state.subscriptions = nextSubscriptions.concat(untouchedSubscriptions);
      const uniqueVideos = uniqueBy(
        sortVideosNewestFirst(nextVideos),
        (video) => video.id
      );
      const maxStoredVideos = Number(MAX_STORED_VIDEOS);
      state.videos = maxStoredVideos > 0 ? uniqueVideos.slice(0, maxStoredVideos) : uniqueVideos;
      state.updatedAt = new Date().toISOString();
      saveState(state);
    } catch (err) {
      console.error('Background refresh failed:', err);
      refreshErrors.push({ channelId: 'system', message: err.message });
    } finally {
      isRefreshing = false;
      // We don't reset progress so the UI can read the final 100% state and errors.
    }
  }, 0);

  return { status: 'started', progress: refreshProgress };
}

function mapStateForClient(state) {
  return {
    subscriptions: state.subscriptions,
    videos: state.videos,
    updatedAt: state.updatedAt,
    search: { enabled: Boolean(YOUTUBE_API_KEY) }
  };
}

async function searchYoutube(query) {
  const trimmed = normalizeInputValue(query);
  if (!trimmed) {
    return [];
  }
  if (!YOUTUBE_API_KEY) {
    throw new Error('Поиск внутри TuuDay Video выключен: добавьте YOUTUBE_API_KEY в переменные окружения.');
  }

  const cacheKey = trimmed.toLowerCase();
  const cached = searchCache.get(cacheKey);
  if (cached) {
    if (cached.expiresAt > Date.now()) {
      return cached.items;
    }
    // TTL expired: delete to prevent unbounded memory growth.
    searchCache.delete(cacheKey);
  }

  const params = new URLSearchParams({
    key: YOUTUBE_API_KEY,
    part: 'snippet',
    q: trimmed,
    type: 'video',
    maxResults: '12',
    videoEmbeddable: 'true',
    safeSearch: 'moderate'
  });
  const response = await fetch(`https://www.googleapis.com/youtube/v3/search?${params.toString()}`);

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`YouTube API error: ${response.status} ${body}`);
  }

  const payload = await response.json();
  const items = (payload.items || []).map((item) => {
    const videoId = item.id && item.id.videoId;
    const snippet = item.snippet || {};
    return {
      id: videoId,
      title: snippet.title || '',
      channelId: snippet.channelId || '',
      channelTitle: snippet.channelTitle || '',
      publishedAt: snippet.publishedAt || '',
      description: snippet.description || '',
      videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
      embedUrl: buildEmbedUrl(videoId),
      thumbnail:
        (snippet.thumbnails && (snippet.thumbnails.medium || snippet.thumbnails.high || snippet.thumbnails.default || {}).url) ||
        `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    };
  }).filter((item) => item.id);

  const maxEntries = Number(SEARCH_CACHE_MAX_ENTRIES);
  if (maxEntries > 0) {
    while (searchCache.size >= maxEntries) {
      const oldestKey = searchCache.keys().next().value;
      if (!oldestKey) {
        break;
      }
      searchCache.delete(oldestKey);
    }
  }

  searchCache.set(cacheKey, { items, expiresAt: Date.now() + SEARCH_CACHE_TTL_MS });
  return items;
}

function normalizeImportHeader(value) {
  return String(value || '')
    .replace(/^\uFEFF/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

function pickImportValueFromRow(row) {
  const entries = Object.entries(row || {});
  const preferredHeaders = [
    'channelurl',
    'channelid',
    'channel',
    'url',
    'link',
    'handle',
    'channeltitle',
    'title'
  ];

  for (const header of preferredHeaders) {
    const match = entries.find(([key, value]) => normalizeImportHeader(key) === header && normalizeInputValue(value));
    if (match) {
      return normalizeInputValue(match[1]);
    }
  }

  const directValue = entries.find(([, value]) => {
    const normalized = normalizeInputValue(value);
    return /^UC[\w-]{22}$/.test(normalized) || normalized.startsWith('@') || /youtube\.com\//i.test(normalized);
  });

  return directValue ? normalizeInputValue(directValue[1]) : '';
}

function extractInlineImportTargets(rawText) {
  const values = [];
  const pushValue = (value) => {
    const normalized = normalizeInputValue(value).replace(/[),.;]+$/g, '');
    if (normalized) {
      values.push(normalized);
    }
  };

  String(rawText || '').split(/\r?\n/).forEach((line) => {
    const trimmed = normalizeInputValue(line);
    if (!trimmed) {
      return;
    }

    if (/^UC[\w-]{22}$/.test(trimmed) || trimmed.startsWith('@') || /youtube\.com\//i.test(trimmed)) {
      pushValue(trimmed);
    }

    const urlMatches = trimmed.match(/https?:\/\/[^\s"'<>]+/gi) || [];
    urlMatches.forEach(pushValue);

    const channelIds = trimmed.match(/\bUC[\w-]{22}\b/g) || [];
    channelIds.forEach(pushValue);

    for (const match of trimmed.matchAll(/(^|[\s(])(@[a-z0-9._-]{3,})\b/gi)) {
      pushValue(match[2]);
    }
  });

  return uniqueBy(values, (value) => value.toLowerCase());
}

function pickChannelInputFromJsonEntry(entry) {
  if (typeof entry === 'string') {
    return normalizeInputValue(entry).replace(/[),.;]+$/g, '');
  }

  if (!entry || typeof entry !== 'object') {
    return '';
  }

  const normalizeMaybeString = (value) => {
    if (typeof value !== 'string') {
      return '';
    }
    return normalizeInputValue(value).replace(/[),.;]+$/g, '');
  };

  const byId =
    normalizeMaybeString(entry.channelId) ||
    normalizeMaybeString(entry.channelID) ||
    normalizeMaybeString(entry.channel_id) ||
    normalizeMaybeString(entry.id);

  if (byId) {
    return byId;
  }

  return (
    normalizeMaybeString(entry.channelUrl) ||
    normalizeMaybeString(entry.channelURL) ||
    normalizeMaybeString(entry.channel_url) ||
    normalizeMaybeString(entry.url) ||
    normalizeMaybeString(entry.link) ||
    normalizeMaybeString(entry.handle) ||
    normalizeMaybeString(entry.value) ||
    ''
  );
}

function parseJsonImportText(text) {
  let parsed = null;

  try {
    parsed = JSON.parse(text);
  } catch (error) {
    return [];
  }

  const values = [];
  const push = (entry) => {
    const value = pickChannelInputFromJsonEntry(entry);
    if (value) {
      values.push(value);
    }
  };

  if (Array.isArray(parsed)) {
    parsed.forEach(push);
    return uniqueBy(values, (value) => value.toLowerCase());
  }

  if (!parsed || typeof parsed !== 'object') {
    return [];
  }

  const maybeList =
    parsed.subscriptions ||
    parsed.channels ||
    parsed.items ||
    parsed.values ||
    [];

  if (Array.isArray(maybeList)) {
    maybeList.forEach(push);
    return uniqueBy(values, (value) => value.toLowerCase());
  }

  const single = pickChannelInputFromJsonEntry(parsed);
  return single ? uniqueBy([single], (value) => value.toLowerCase()) : [];
}

async function parseImportText(text) {
  const rawText = String(text || '').trim();
  if (!rawText) {
    return [];
  }

  const firstChar = rawText[0];
  if (firstChar === '{' || firstChar === '[') {
    const jsonValues = parseJsonImportText(rawText);
    if (jsonValues.length) {
      return jsonValues;
    }
  }

  const firstLine = rawText.split(/\r?\n/, 1)[0] || '';
  const looksLikeCsv = /[;,]/.test(firstLine) && /\r?\n/.test(rawText);

  if (looksLikeCsv) {
    const csvValues = uniqueBy(
      parseCsv(rawText).map((row) => pickImportValueFromRow(row)).filter(Boolean),
      (value) => value.toLowerCase()
    );

    if (csvValues.length) {
      return csvValues;
    }
  }

  const inlineValues = extractInlineImportTargets(rawText);
  if (inlineValues.length) {
    return inlineValues;
  }

  return uniqueBy(
    rawText.split(/\r?\n|;/).map((line) => normalizeInputValue(line)).filter(Boolean),
    (value) => value.toLowerCase()
  );
}

function parseNumberString(value) {
  return value ? String(value) : '';
}

function mapPlaylistItemToVideo(item, fallbackChannel) {
  const snippet = item && item.snippet ? item.snippet : {};
  const resourceId = snippet.resourceId || {};
  const videoId = resourceId.videoId || '';

  if (!videoId) {
    return null;
  }

  return {
    id: videoId,
    channelId: snippet.channelId || fallbackChannel.channelId || '',
    channelTitle: snippet.channelTitle || fallbackChannel.title || '',
    title: snippet.title || '',
    publishedAt: snippet.publishedAt || '',
    description: snippet.description || '',
    videoUrl: buildVideoUrl(videoId),
    embedUrl: buildEmbedUrl(videoId),
    thumbnail:
      (snippet.thumbnails && (snippet.thumbnails.high || snippet.thumbnails.medium || snippet.thumbnails.default || {}).url) ||
      `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
  };
}

function extractVideoChannelIdFromHtml(html) {
  return (
    firstMatch(html, /"externalChannelId":"(UC[\w-]{22})"/i) ||
    firstMatch(html, /"channelId":"(UC[\w-]{22})"/i) ||
    extractChannelIdFromHtml(html)
  );
}

function parseVideoPageMeta(html, videoId, state) {
  const knownVideo =
    (state.videos || []).find((item) => item.id === videoId) ||
    {};
  const playerResponse = parseYoutubePlayerResponse(html) || {};
  const playability = playerResponse.playabilityStatus || {};
  const playabilityTexts = collectRendererStrings([
    playability.reason,
    playability.messages,
    playability.errorScreen
  ]);
  const playabilityStatus = normalizeInputValue(playability.status || knownVideo.playabilityStatus || '');
  const playabilityReason =
    normalizeInputValue(playability.reason) ||
    playabilityTexts.find(Boolean) ||
    knownVideo.playabilityReason ||
    '';
  const canonicalUrl =
    decodeXml(firstMatch(html, /<link rel="canonical" href="([^"]+)"/i)) ||
    decodeXml(firstMatch(html, /<meta[^>]+property="og:url"[^>]+content="([^"]+)"/i)) ||
    '';
  const isShort = /youtube\.com\/shorts\//i.test(canonicalUrl);
  const isMembersOnly = isMembersOnlyReason(playabilityReason) || Boolean(knownVideo.isMembersOnly);
  const isPlayable =
    playabilityStatus
      ? !isUnavailablePlayabilityStatus(playabilityStatus, playabilityReason)
      : (typeof knownVideo.isPlayable === 'boolean' ? knownVideo.isPlayable : !isMembersOnly);
  const channelId = extractVideoChannelIdFromHtml(html) || knownVideo.channelId || '';
  const title =
    decodeXml(firstMatch(html, /<meta[^>]+property="og:title"[^>]+content="([^"]+)"/i)) ||
    decodeJsonString(firstMatch(html, /"title":"((?:\\.|[^"\\])*)"/i)) ||
    knownVideo.title ||
    videoId;
  const channelTitle =
    decodeJsonString(firstMatch(html, /"ownerChannelName":"((?:\\.|[^"\\])*)"/i)) ||
    decodeJsonString(firstMatch(html, /"author":"((?:\\.|[^"\\])*)"/i)) ||
    decodeXml(firstMatch(html, /<link[^>]+itemprop="name"[^>]+content="([^"]+)"/i)) ||
    knownVideo.channelTitle ||
    channelId ||
    '';
  const description =
    decodeJsonString(firstMatch(html, /"shortDescription":"((?:\\.|[^"\\])*)"/i)) ||
    decodeXml(firstMatch(html, /<meta[^>]+property="og:description"[^>]+content="([^"]+)"/i)) ||
    decodeXml(firstMatch(html, /<meta[^>]+name="description"[^>]+content="([^"]+)"/i)) ||
    knownVideo.description ||
    '';
  const publishedAt =
    decodeXml(firstMatch(html, /<meta[^>]+itemprop="datePublished"[^>]+content="([^"]+)"/i)) ||
    firstMatch(html, /"publishDate":"([^"]+)"/i) ||
    knownVideo.publishedAt ||
    '';
  const thumbnail =
    decodeXml(firstMatch(html, /<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i)) ||
    decodeJsonString(firstMatch(html, /"thumbnailUrl":"((?:\\.|[^"\\])*)"/i)) ||
    knownVideo.thumbnail ||
    `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return {
    id: videoId,
    channelId,
    channelTitle,
    title,
    publishedAt,
    description,
    videoUrl: isShort ? (canonicalUrl || buildShortsUrl(videoId)) : buildVideoUrl(videoId),
    embedUrl: buildEmbedUrl(videoId),
    thumbnail,
    isShort,
    isMembersOnly,
    isPlayable,
    playabilityStatus,
    playabilityReason
  };
}

async function fetchVideoDetailsFallback(videoId, state) {
  const html = await fetchText(buildVideoUrl(videoId));
  return parseVideoPageMeta(html, videoId, state);
}

async function fetchVideoDetailsApi(videoId) {
  const params = new URLSearchParams({
    key: YOUTUBE_API_KEY,
    id: videoId,
    part: 'snippet'
  });
  const payload = await fetchJson(`https://www.googleapis.com/youtube/v3/videos?${params.toString()}`);
  const item = payload.items && payload.items[0];

  if (!item) {
    throw new Error('Video not found.');
  }

  const snippet = item.snippet || {};
  return {
    id: videoId,
    channelId: snippet.channelId || '',
    channelTitle: snippet.channelTitle || '',
    title: snippet.title || videoId,
    publishedAt: snippet.publishedAt || '',
    description: snippet.description || '',
    videoUrl: buildVideoUrl(videoId),
    embedUrl: buildEmbedUrl(videoId),
    thumbnail:
      (snippet.thumbnails &&
        (snippet.thumbnails.maxres || snippet.thumbnails.standard || snippet.thumbnails.high || snippet.thumbnails.medium || snippet.thumbnails.default || {}).url) ||
      `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
  };
}

async function fetchVideoDurationsApi(videoIds) {
  const ids = uniqueBy((videoIds || []).filter(Boolean), (id) => id);
  if (!ids.length || !YOUTUBE_API_KEY) {
    return new Map();
  }

  const durations = new Map();

  for (let index = 0; index < ids.length; index += 50) {
    const batch = ids.slice(index, index + 50);
    const params = new URLSearchParams({
      key: YOUTUBE_API_KEY,
      id: batch.join(','),
      part: 'contentDetails'
    });
    const payload = await fetchJson(`https://www.googleapis.com/youtube/v3/videos?${params.toString()}`);

    for (const item of payload.items || []) {
      const id = normalizeInputValue(item && item.id);
      if (!id) {
        continue;
      }
      durations.set(id, parseIsoDurationToSeconds(item.contentDetails && item.contentDetails.duration));
    }
  }

  return durations;
}

async function fetchVideoDetails(value, state) {
  const videoId = extractVideoId(value);

  if (!videoId) {
    throw new Error('Enter a YouTube video id or URL.');
  }

  if (YOUTUBE_API_KEY) {
    try {
      return await fetchVideoDetailsApi(videoId);
    } catch (error) {
      // Fall back to the public watch page parser below.
    }
  }

  return fetchVideoDetailsFallback(videoId, state);
}

function mapCommentThreadToComment(item) {
  const threadSnippet = (item && item.snippet) || {};
  const topLevelComment = threadSnippet.topLevelComment || {};
  const snippet = topLevelComment.snippet || {};

  return {
    id: topLevelComment.id || item.id || '',
    authorDisplayName: snippet.authorDisplayName || 'YouTube',
    authorProfileImageUrl: snippet.authorProfileImageUrl || '',
    authorChannelId: (snippet.authorChannelId && snippet.authorChannelId.value) || '',
    authorChannelUrl: snippet.authorChannelUrl || '',
    text: snippet.textOriginal || stripTags(snippet.textDisplay || ''),
    publishedAt: snippet.publishedAt || '',
    updatedAt: snippet.updatedAt || '',
    likeCount: Number(snippet.likeCount || 0),
    replyCount: Number(threadSnippet.totalReplyCount || 0)
  };
}

async function fetchVideoComments(videoId, pageToken) {
  if (!videoId) {
    throw new Error('Video id is required.');
  }

  if (!YOUTUBE_API_KEY) {
    throw new Error('Комментарии доступны только при настроенном YOUTUBE_API_KEY.');
  }

  const params = new URLSearchParams({
    key: YOUTUBE_API_KEY,
    part: 'snippet',
    videoId,
    maxResults: '20',
    order: 'relevance',
    textFormat: 'plainText'
  });

  if (pageToken) {
    params.set('pageToken', pageToken);
  }

  const payload = await fetchJson(`https://www.googleapis.com/youtube/v3/commentThreads?${params.toString()}`);
  return {
    items: (payload.items || []).map(mapCommentThreadToComment).filter((item) => item.id && item.text),
    nextPageToken: payload.nextPageToken || '',
    totalResults: Number((payload.pageInfo && payload.pageInfo.totalResults) || 0)
  };
}

function parseChannelPageMeta(html, channelId, state) {
  const subscription = state.subscriptions.find((item) => item.channelId === channelId) || {};
  const initialData = parseYoutubeInitialData(html);
  const metadataRenderer = findRendererNode(initialData, 'channelMetadataRenderer') || {};
  const title =
    readTextRuns(metadataRenderer.title) ||
    decodeXml(firstMatch(html, /<meta[^>]+property="og:title"[^>]+content="([^"]+)"/i)) ||
    stripTags(firstMatch(html, /<title>([\s\S]*?)<\/title>/i)).replace(/\s*-\s*YouTube\s*$/i, '') ||
    subscription.channelTitle ||
    channelId;
  const description =
    readTextRuns(metadataRenderer.description) ||
    decodeXml(firstMatch(html, /<meta[^>]+name="description"[^>]+content="([^"]+)"/i)) ||
    '';
  const thumbnail =
    parseChannelAvatarFromHtml(html) ||
    pickThumbnailUrl(metadataRenderer.avatar || metadataRenderer.thumbnail) ||
    subscription.thumbnail ||
    '';
  const customUrl =
    normalizeInputValue(metadataRenderer.vanityChannelUrl) ||
    decodeJsonString(firstMatch(html, /"canonicalBaseUrl":"((?:\\.|[^"\\])*)"/i)) ||
    '';

  return {
    channelId,
    title,
    description,
    thumbnail,
    banner: '',
    subscriberCount: '',
    videoCount: '',
    viewCount: '',
    customUrl
  };
}

async function fetchChannelPageFallback(channelId, state) {
  const html = await fetchText(buildChannelVideosUrl(channelId));
  const initialData = parseYoutubeInitialData(html);
  if (!initialData) {
    throw new Error('Could not parse YouTube channel page.');
  }
  const channel = parseChannelPageMeta(html, channelId, state);
  const rawVideos = uniqueBy(
    collectRendererNodes(initialData, 'videoRenderer')
      .map((videoRenderer) => mapVideoRendererToVideo(videoRenderer, channel))
      .filter(Boolean),
    (video) => video.id
  );
  const videos = [];

  for (const rawVideo of rawVideos) {
    const resolvedVideo = await resolveVideoFlags(rawVideo, state);
    if (shouldExcludeVideoFromFeed(resolvedVideo)) {
      continue;
    }
    videos.push(resolvedVideo);
  }

  return {
    channel,
    videos,
    nextPageToken: ''
  };
}

async function fetchChannelPageApi(channelId, pageToken, state) {
  const channelParams = new URLSearchParams({
    key: YOUTUBE_API_KEY,
    id: channelId,
    part: 'snippet,contentDetails,statistics,brandingSettings'
  });
  const channelPayload = await fetchJson(`https://www.googleapis.com/youtube/v3/channels?${channelParams.toString()}`);
  const channelItem = channelPayload.items && channelPayload.items[0];

  if (!channelItem) {
    throw new Error('Channel not found.');
  }

  const uploadsPlaylistId =
    channelItem.contentDetails &&
    channelItem.contentDetails.relatedPlaylists &&
    channelItem.contentDetails.relatedPlaylists.uploads;
  const channel = {
    channelId,
    title: (channelItem.snippet && channelItem.snippet.title) || channelId,
    description: (channelItem.snippet && channelItem.snippet.description) || '',
    thumbnail:
      (channelItem.snippet &&
        channelItem.snippet.thumbnails &&
        (channelItem.snippet.thumbnails.high || channelItem.snippet.thumbnails.medium || channelItem.snippet.thumbnails.default || {}).url) ||
      '',
    banner:
      (channelItem.brandingSettings &&
        channelItem.brandingSettings.image &&
        (channelItem.brandingSettings.image.bannerExternalUrl ||
          channelItem.brandingSettings.image.bannerMobileExtraHdImageUrl ||
          channelItem.brandingSettings.image.bannerTabletExtraHdImageUrl)) ||
      '',
    subscriberCount: parseNumberString(channelItem.statistics && channelItem.statistics.subscriberCount),
    videoCount: parseNumberString(channelItem.statistics && channelItem.statistics.videoCount),
    viewCount: parseNumberString(channelItem.statistics && channelItem.statistics.viewCount),
    customUrl:
      (channelItem.snippet && channelItem.snippet.customUrl) ||
      (channelItem.brandingSettings && channelItem.brandingSettings.channel && channelItem.brandingSettings.channel.customUrl) ||
      ''
  };

  if (!uploadsPlaylistId) {
    return { channel, videos: [], nextPageToken: '' };
  }

  const playlistParams = new URLSearchParams({
    key: YOUTUBE_API_KEY,
    playlistId: uploadsPlaylistId,
    part: 'snippet,contentDetails',
    maxResults: '24'
  });

  if (pageToken) {
    playlistParams.set('pageToken', pageToken);
  }

  const playlistPayload = await fetchJson(`https://www.googleapis.com/youtube/v3/playlistItems?${playlistParams.toString()}`);
  const rawVideos = (playlistPayload.items || [])
    .map((item) => mapPlaylistItemToVideo(item, channel))
    .filter(Boolean);
  const durations = await fetchVideoDurationsApi(rawVideos.map((video) => video.id));
  const videos = [];

  for (const rawVideo of rawVideos) {
    const video = {
      ...rawVideo,
      durationSeconds: durations.get(rawVideo.id) || 0
    };
    const resolvedVideo = await resolveVideoFlags(video, state);
    if (shouldExcludeVideoFromFeed(resolvedVideo)) {
      continue;
    }
    videos.push(resolvedVideo);
  }

  return {
    channel,
    videos,
    nextPageToken: playlistPayload.nextPageToken || ''
  };
}

async function fetchChannelPageRss(channelId, state) {
  const feed = await fetchFeedForChannel(channelId);
  const channel = {
    channelId,
    title: feed.title || channelId,
    description: '',
    thumbnail: '',
    banner: '',
    subscriberCount: '',
    videoCount: '',
    viewCount: '',
    customUrl: ''
  };

  const videos = [];
  for (const rawVideo of feed.videos || []) {
    const resolvedVideo = await resolveVideoFlags(rawVideo, state);
    if (shouldExcludeVideoFromFeed(resolvedVideo)) {
      continue;
    }
    videos.push(resolvedVideo);
  }

  return {
    channel,
    videos,
    nextPageToken: ''
  };
}

async function fetchChannelPageData(channelId, pageToken, state) {
  if (!pageToken) {
    try {
      return await fetchChannelPageRss(channelId, state);
    } catch (error) {
      // Fall through to API or HTML fallback
    }
  }

  if (YOUTUBE_API_KEY) {
    try {
      return await fetchChannelPageApi(channelId, pageToken, state);
    } catch (error) {
      if (pageToken) {
        throw error;
      }
    }
  }

  return fetchChannelPageFallback(channelId, state);
}

async function fetchChannelVideosForRefresh(channelId, state) {
  const pagesLimit = Math.max(1, Number(REFRESH_CHANNEL_PAGES) || 1);
  const maxVideosPerChannel = Number(MAX_VIDEOS_PER_CHANNEL);
  const collectedVideos = [];
  let channel = null;

  // 1. Try RSS first as it is fastest and requires no API key
  try {
    const rssPayload = await fetchChannelPageRss(channelId, state);
    channel = rssPayload.channel || {};
    collectedVideos.push(...(rssPayload.videos || []));
  } catch (error) {
    // Ignore RSS errors and fall back to other methods
  }

  // 2. If no API key, use HTML fallback only if RSS failed or returned nothing
  if (!YOUTUBE_API_KEY) {
    if (collectedVideos.length === 0) {
      try {
        const fallbackPayload = await fetchChannelPageFallback(channelId, state);
        const fallbackChannel = fallbackPayload.channel || {};
        channel = {
          ...channel,
          ...fallbackChannel,
          title: fallbackChannel.title || (channel && channel.title) || channelId,
          thumbnail: fallbackChannel.thumbnail || (channel && channel.thumbnail) || ''
        };
        collectedVideos.push(...(fallbackPayload.videos || []));
      } catch (error) {
        // Ignore
      }
    }

    const uniqueVideos = uniqueBy(collectedVideos, (video) => video.id);
    return {
      channel: channel || {},
      videos: maxVideosPerChannel > 0 ? uniqueVideos.slice(0, maxVideosPerChannel) : uniqueVideos
    };
  }

  // 3. If we have an API key, use it to get richer channel data and more pages of videos
  try {
    const firstApiPayload = await fetchChannelPageApi(channelId, '', state);
    const apiChannel = firstApiPayload.channel || {};
    
    // Merge channel data: prefer API for counts/banner, but keep RSS/Fallback title if API fails
    channel = {
      ...channel,
      ...apiChannel,
      title: apiChannel.title || (channel && channel.title) || channelId,
      thumbnail: apiChannel.thumbnail || (channel && channel.thumbnail) || ''
    };

    collectedVideos.push(...(firstApiPayload.videos || []));

    let pageToken = normalizeInputValue(firstApiPayload.nextPageToken || '');
    let pageNumber = 1;

    while (pageNumber < pagesLimit && pageToken) {
      if (maxVideosPerChannel > 0 && collectedVideos.length >= maxVideosPerChannel) {
        break;
      }

      const payload = await fetchChannelPageApi(channelId, pageToken, state);
      collectedVideos.push(...(payload.videos || []));
      pageToken = normalizeInputValue(payload.nextPageToken || '');
      pageNumber += 1;
    }
  } catch (error) {
    // If API fails, we still have RSS/Fallback data in collectedVideos/channel
  }

  // 4. Also try fallback for members-only badges if needed (HTML scraping)
  if (collectedVideos.length === 0 || (channel && !channel.thumbnail)) {
    try {
      const fallbackPayload = await fetchChannelPageFallback(channelId, state);
      const fallbackChannel = fallbackPayload.channel || {};
      channel = {
        ...channel,
        ...fallbackChannel,
        title: channel.title || fallbackChannel.title || channelId,
        thumbnail: channel.thumbnail || fallbackChannel.thumbnail || ''
      };
      collectedVideos.push(...(fallbackPayload.videos || []));
    } catch (error) {
      // Ignore
    }
  }

  const uniqueVideos = uniqueBy(collectedVideos, (video) => video.id);
  return {
    channel: channel || {},
    videos: maxVideosPerChannel > 0 ? uniqueVideos.slice(0, maxVideosPerChannel) : uniqueVideos
  };
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 2 * 1024 * 1024) {
        reject(new Error('Body too large'));
        req.destroy();
      }
    });

    req.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(new Error('Invalid JSON body'));
      }
    });

    req.on('error', reject);
  });
}

function safeJoin(baseDir, requestedPath) {
  const base = path.normalize(baseDir).toLowerCase();
  const fullPath = path.normalize(path.join(baseDir, requestedPath));
  return fullPath.toLowerCase().startsWith(base) ? fullPath : '';
}

function contentTypeFor(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.html') return 'text/html';
  if (ext === '.css') return 'text/css';
  if (ext === '.js') return 'application/javascript';
  if (ext === '.json') return 'application/json';
  if (ext === '.png') return 'image/png';
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.svg') return 'image/svg+xml';
  if (ext === '.ico') return 'image/x-icon';
  if (ext === '.txt') return 'text/plain';
  return 'application/octet-stream';
}

function serveFile(res, filePath) {
  fs.readFile(filePath, (error, buffer) => {
    if (error) {
      notFound(res);
      return;
    }
    res.writeHead(200, { 'Content-Type': `${contentTypeFor(filePath)}; charset=utf-8` });
    res.end(buffer);
  });
}

async function handleApi(req, res, pathname) {
  const state = loadState();

  if (req.method === 'GET' && pathname === '/api/video/state') {
    sendJson(res, 200, mapStateForClient(state));
    return true;
  }

  if (req.method === 'GET' && pathname === '/api/video/subscriptions/export') {
    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      subscriptions: (state.subscriptions || []).map((s) => ({
        channelId: s.channelId,
        channelTitle: s.channelTitle || '',
        thumbnail: s.thumbnail || '',
        feedUrl: s.feedUrl || '',
        addedAt: s.addedAt || null
      }))
    };

    sendJson(res, 200, payload);
    return true;
  }

  if (req.method === 'POST' && pathname === '/api/video/refresh') {
    if (!isTrustedMutationRequest(req)) {
      sendJson(res, 403, { error: 'Forbidden' });
      return true;
    }
    try {
      const result = await runBackgroundRefresh();
      sendJson(res, 202, result);
    } catch (error) {
      sendJson(res, 500, { error: error.message });
    }
    return true;
  }

  if (req.method === 'GET' && pathname === '/api/video/refresh/status') {
    sendJson(res, 200, {
      isRefreshing,
      progress: refreshProgress,
      errors: refreshErrors
    });
    return true;
  }

  if (req.method === 'POST' && pathname === '/api/video/subscriptions') {
    if (!isTrustedMutationRequest(req)) {
      sendJson(res, 403, { error: 'Forbidden' });
      return true;
    }
    try {
      const body = await readJsonBody(req);
      const resolved = await resolveChannelInput(body.value);

      if (state.subscriptions.some((item) => item.channelId === resolved.channelId)) {
        sendJson(res, 200, { ok: true, duplicate: true, state: mapStateForClient(state) });
        return true;
      }

      state.subscriptions.unshift({
        channelId: resolved.channelId,
        channelTitle: resolved.channelTitle,
        source: resolved.source,
        feedUrl: resolved.feedUrl,
        thumbnail: resolved.channelThumbnail || '',
        addedAt: new Date().toISOString(),
        lastCheckedAt: null,
        lastVideoAt: resolved.previewVideo ? resolved.previewVideo.publishedAt : null,
        lastError: ''
      });

      saveState(state);
      sendJson(res, 200, { ok: true, state: mapStateForClient(state) });
    } catch (error) {
      sendJson(res, 400, { error: error.message });
    }
    return true;
  }

  if (req.method === 'DELETE' && pathname.startsWith('/api/video/subscriptions/')) {
    if (!isTrustedMutationRequest(req)) {
      sendJson(res, 403, { error: 'Forbidden' });
      return true;
    }
    const channelId = decodeURIComponent(pathname.split('/').pop() || '');
    const nextState = {
      ...state,
      subscriptions: state.subscriptions.filter((item) => item.channelId !== channelId),
      videos: state.videos.filter((item) => item.channelId !== channelId)
    };
    saveState(nextState);
    sendJson(res, 200, { ok: true, state: mapStateForClient(nextState) });
    return true;
  }

  if (req.method === 'POST' && pathname === '/api/video/import') {
    if (!isTrustedMutationRequest(req)) {
      sendJson(res, 403, { error: 'Forbidden' });
      return true;
    }
    try {
      const body = await readJsonBody(req);
      const values = await parseImportText(body.text);
      const max = Number(IMPORT_MAX_VALUES);
      if (max > 0 && values.length > max) {
        throw new Error(`Import too large: max ${max} channels.`);
      }
      const added = [];
      const skipped = [];
      const errors = [];

      for (const value of values) {
        try {
          const resolved = await resolveChannelInput(value);
          if (state.subscriptions.some((item) => item.channelId === resolved.channelId)) {
            skipped.push(value);
            continue;
          }

          state.subscriptions.push({
            channelId: resolved.channelId,
            channelTitle: resolved.channelTitle,
            source: resolved.source,
            feedUrl: resolved.feedUrl,
            thumbnail: resolved.channelThumbnail || '',
            addedAt: new Date().toISOString(),
            lastCheckedAt: null,
            lastVideoAt: resolved.previewVideo ? resolved.previewVideo.publishedAt : null,
            lastError: ''
          });
          added.push(resolved.channelTitle);
        } catch (error) {
          errors.push({ value, message: error.message });
        }
      }

      saveState(state);
      sendJson(res, 200, { ok: true, added, skipped, errors, state: mapStateForClient(state) });
    } catch (error) {
      sendJson(res, 400, { error: error.message });
    }
    return true;
  }

  if (req.method === 'GET' && pathname === '/api/video/search') {
    try {
      const requestUrl = new URL(req.url, `http://${req.headers.host}`);
      const items = await searchYoutube(requestUrl.searchParams.get('q') || '');
      sendJson(res, 200, { items });
    } catch (error) {
      sendJson(res, 400, { error: error.message });
    }
    return true;
  }

  if (req.method === 'GET' && pathname === '/api/video/video') {
    try {
      const requestUrl = new URL(req.url, `http://${req.headers.host}`);
      const value = normalizeInputValue(requestUrl.searchParams.get('value') || requestUrl.searchParams.get('id') || '');

      if (!value) {
        sendJson(res, 400, { error: 'Video id or URL is required.' });
        return true;
      }

      const video = await fetchVideoDetails(value, state);
      sendJson(res, 200, { video });
    } catch (error) {
      sendJson(res, 400, { error: error.message });
    }
    return true;
  }

  if (req.method === 'GET' && pathname === '/api/video/comments') {
    try {
      const requestUrl = new URL(req.url, `http://${req.headers.host}`);
      const videoId = extractVideoId(requestUrl.searchParams.get('id') || requestUrl.searchParams.get('videoId') || '');
      const pageToken = normalizeInputValue(requestUrl.searchParams.get('pageToken') || '');

      if (!videoId) {
        sendJson(res, 400, { error: 'Video id is required.' });
        return true;
      }

      const payload = await fetchVideoComments(videoId, pageToken);
      sendJson(res, 200, payload);
    } catch (error) {
      sendJson(res, 400, { error: error.message });
    }
    return true;
  }

  if (req.method === 'GET' && pathname === '/api/video/channel') {
    try {
      const requestUrl = new URL(req.url, `http://${req.headers.host}`);
      const channelId = normalizeInputValue(requestUrl.searchParams.get('id') || '');
      const pageToken = normalizeInputValue(requestUrl.searchParams.get('pageToken') || '');

      if (!channelId) {
        sendJson(res, 400, { error: 'Channel id is required.' });
        return true;
      }

      const payload = await fetchChannelPageData(channelId, pageToken, state);
      sendJson(res, 200, payload);
    } catch (error) {
      sendJson(res, 400, { error: error.message });
    }
    return true;
  }

  return false;
}

function serveStatic(res, pathname) {
  if (pathname === '/favicon.ico') {
    const faviconPath = path.join(ROOT_DIR, 'favicon.ico');
    if (!fs.existsSync(faviconPath)) {
      notFound(res);
      return true;
    }
    serveFile(res, faviconPath);
    return true;
  }

  // Handle root and /video/ index paths
  const isIndexPath = 
    pathname === '/' || 
    pathname === '/main.html' || 
    pathname === '/video' || 
    pathname === '/video/' || 
    pathname === '/video/index.html';

  if (isIndexPath) {
    const mainPath = path.join(ROOT_DIR, 'main.html');
    if (pathname === '/' && fs.existsSync(mainPath)) {
      serveFile(res, mainPath);
    } else {
      serveFile(res, path.join(VIDEO_DIR, 'index.html'));
    }
    return true;
  }

  if (pathname.startsWith('/video/data/')) {
    notFound(res);
    return true;
  }

  let relativePath = pathname.replace(/^\/+/, '');
  
  // If requested with /video/ prefix, try to serve from ROOT_DIR or VIDEO_DIR
  if (relativePath.startsWith('video/')) {
    const stripped = relativePath.replace(/^video\//, '');
    if (stripped) {
      // Try root first (standalone mode)
      if (fs.existsSync(path.join(ROOT_DIR, stripped))) {
        relativePath = stripped;
      } 
      // Then try video subfolder if it exists
      else if (VIDEO_DIR !== ROOT_DIR && fs.existsSync(path.join(VIDEO_DIR, stripped))) {
        const filePath = safeJoin(VIDEO_DIR, stripped);
        if (filePath) {
          serveFile(res, filePath);
          return true;
        }
      }
    }
  }

  const filePath = safeJoin(ROOT_DIR, relativePath);
  if (!filePath || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    return false;
  }

  serveFile(res, filePath);
  return true;
}

async function requestHandler(req, res) {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = decodeURIComponent(requestUrl.pathname);

  try {
    if (await handleApi(req, res, pathname)) {
      return;
    }
    if (serveStatic(res, pathname)) {
      return;
    }
    notFound(res);
  } catch (error) {
    sendJson(res, 500, { error: error.message });
  }
}

function startServer() {
  ensureDataFile();
  const server = http.createServer(requestHandler);
  server.listen(PORT, () => {
    console.log(`TuuDay video server running at http://localhost:${PORT}`);
    console.log(`Search API ${YOUTUBE_API_KEY ? 'enabled' : 'disabled'}${YOUTUBE_API_KEY ? '' : ' (set YOUTUBE_API_KEY to enable in-app YouTube search)'}`);
    
    // Auto-refresh subscriptions every 15 minutes in the background
    setInterval(() => {
      console.log('Running scheduled background refresh...');
      runBackgroundRefresh().catch(err => console.error('Scheduled refresh failed:', err));
    }, 15 * 60 * 1000);
  });
  return server;
}

if (require.main === module) {
  startServer();
}

module.exports = {
  startServer,
  parseFeed,
  parseCsv,
  parseImportText
};
