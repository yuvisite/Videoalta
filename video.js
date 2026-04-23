// i18n
const translations = {
    ru: {
        nav_video: "видео",
        nav_search: "поиск",
        nav_watch: "просмотр",
        nav_settings: "Настройки",
        search_placeholder: "поиск видео",
        btn_search: "Поиск",
        link_home: "главная",
        link_channels: "каналы",
        link_player: "плеер",
        title_subs: "Подписки",
        input_sub_placeholder: "@handle или youtube.com/...",
        title_import: "Импорт",
        input_import_placeholder: "Вставьте ссылки или JSON",
        btn_export: "Экспорт JSON",
        btn_refresh: "Обновить",
        btn_refresh_start: "Запуск...",
        btn_refresh_upd: "Upd {current}/{total}",
        
        empty_feed: "Лента пока пуста. Добавьте каналы и нажмите «Обновить».",
        empty_new: "Нет новых видео.",
        empty_extra: "Нет дополнительных видео.",
        empty_watch: "Нет видео для просмотра.",
        empty_side: "Пока пусто.",
        empty_subs: "Список подписок пока пуст.",
        empty_subs_panel: "Подписок пока нет.",
        empty_channel: "Канал не загружен.",
        empty_channel_videos: "Видео канала пока недоступны.",
        empty_other_videos: "Нет других видео этого канала.",
        empty_recommendations: "Нет рекомендаций.",
        empty_side_details: "Нет данных для боковой панели.",
        
        search_prompt: "Введите запрос",
        search_waiting: "Страница поиска ждёт запрос.",
        search_global_progress: "Идёт глобальный поиск...",
        search_subs_progress: "Ищем по подпискам...",
        search_found: "Найдено: ",
        search_not_found_global: "По этому запросу ничего не найдено.",
        search_not_found_subs: "По подпискам ничего не найдено. Попробуйте глобальный поиск.",
        
        page_channels: "Каналы - Videoalta",
        page_search: "Поиск - Videoalta",
        page_watch: "Просмотр - Videoalta",
        page_channel: "Канал - Videoalta",
        
        stat_not_updated: "не обновлялось",
        btn_loading: "загрузка...",
        btn_more_videos: "ещё видео",
        btn_more_comments: "ещё комментарии",
        btn_collapse: "Свернуть ▲",
        btn_expand: "Развернуть ▼",
        btn_theater: "Театр",
        btn_normal: "Обычный",
        
        msg_sub_exists: "Канал уже есть.",
        msg_sub_added: "Канал добавлен.",
        msg_import_res: "Импорт: {added} добавлено, {skipped} пропущено, {errors} ошибок",
        msg_sub_removed: "Канал удален.",
        msg_refresh_errors: "Есть ошибки: {count}",
        msg_feed_updated: "Лента обновлена.",
        msg_no_channel_id: "Не указан channel id.",
        msg_no_author: "Не удалось загрузить автора и описание для этого видео.",
        msg_api_fail: "Не удалось загрузить API плеера YouTube.",
        msg_api_unavail: "API плеера недоступно.",
        
        lbl_subscribers: "подписчиков",
        lbl_videos: "видео",
        lbl_views: "просмотров",
        lbl_likes: "лайков",
        lbl_replies: "ответов",
        lbl_comments: "комментариев",
        lbl_comments_unavail: "недоступно",
        lbl_comments_loading: "Загрузка комментариев...",
        lbl_comments_empty: "Комментарии пока не найдены.",
        lbl_no_tags: "нет тэгов",
        lbl_no_date: "без даты",
        lbl_user: "Пользователь",
        lbl_link: "Ссылка:",
        lbl_player_code: "Код плеера:",
        lbl_category: "Категория:",
        lbl_tags: "Тэги:",
        lbl_channel: "канал",
        lbl_no_desc: "Описание пока не сохранено.",
        lbl_no_title: "Без названия",
        lbl_watch_video: "Просмотр видео",
        lbl_no_stat: "Данные канала без статистики",
        lbl_no_channel_desc: "Описание отсутствует.",
        lbl_videos_on_page: "{count} видео на странице",
        lbl_no_videos: "нет видео",
        
        cat_music: "Музыка",
        cat_news: "Новости",
        cat_games: "Игры",
        cat_movies: "Кино",
        cat_funny: "Смешное",
        cat_review: "Обзор",
        cat_misc: "Разное",

        // New keys
        home_featured_title: "Самое свежее из вашей ленты",
        home_latest_title: "Последние добавления",
        link_all_videos: "все видео",
        link_open: "открыть",
        side_now_title: "Сейчас",
        side_feed_title: "Лента",
        side_from_feed: "Из вашей ленты",
        side_random_channels: "Случайные каналы",
        page_subs_title: "Список подписок",
        search_results_title: "Результаты поиска",
        search_mode_subs: "По подпискам",
        search_mode_global: "Глобальный",
        search_mode_note: "Поиск по подпискам работает локально и не тратит API-кредиты.",
        lbl_language: "Язык",
        lbl_channels_stat: "{count} каналов",
        lbl_videos_stat: "{count} видео",
        lbl_upd_stat: "upd {date}",
        lbl_comments_title: "Комментарии",
        lbl_more_from_channel: "Еще с этого канала",
        lbl_similar_videos: "Похожее видео",
        lbl_channel_videos: "Видео канала",
        lbl_forum_code: "Код для форума:",
        lbl_blog_code: "Код для блога:",
        lbl_theme: "Тема",
        theme_light: "Светлая",
        theme_dark: "Темная"
    },
    en: {
        nav_video: "video",
        nav_search: "search",
        nav_watch: "watch",
        nav_settings: "Settings",
        search_placeholder: "search video",
        btn_search: "Search",
        link_home: "home",
        link_channels: "channels",
        link_player: "player",
        title_subs: "Subscriptions",
        input_sub_placeholder: "@handle or youtube.com/...",
        title_import: "Import",
        input_import_placeholder: "Paste links or JSON",
        btn_export: "Export JSON",
        btn_refresh: "Refresh",
        btn_refresh_start: "Starting...",
        btn_refresh_upd: "Upd {current}/{total}",
        
        empty_feed: "Feed is empty. Add channels and click Refresh.",
        empty_new: "No new videos.",
        empty_extra: "No additional videos.",
        empty_watch: "No video to watch.",
        empty_side: "Empty for now.",
        empty_subs: "Subscription list is empty.",
        empty_subs_panel: "No subscriptions yet.",
        empty_channel: "Channel not loaded.",
        empty_channel_videos: "Channel videos are not available yet.",
        empty_other_videos: "No other videos from this channel.",
        empty_recommendations: "No recommendations.",
        empty_side_details: "No data for sidebar.",
        
        search_prompt: "Enter a query",
        search_waiting: "Search page is waiting for a query.",
        search_global_progress: "Global search in progress...",
        search_subs_progress: "Searching in subscriptions...",
        search_found: "Found: ",
        search_not_found_global: "Nothing found for this query.",
        search_not_found_subs: "Nothing found in subscriptions. Try global search.",
        
        page_channels: "Channels - Videoalta",
        page_search: "Search - Videoalta",
        page_watch: "Watch - Videoalta",
        page_channel: "Channel - Videoalta",
        
        stat_not_updated: "not updated",
        btn_loading: "loading...",
        btn_more_videos: "more videos",
        btn_more_comments: "more comments",
        btn_collapse: "Collapse ▲",
        btn_expand: "Expand ▼",
        btn_theater: "Theater",
        btn_normal: "Normal",
        
        msg_sub_exists: "Channel already exists.",
        msg_sub_added: "Channel added.",
        msg_import_res: "Import: {added} added, {skipped} skipped, {errors} errors",
        msg_sub_removed: "Channel removed.",
        msg_refresh_errors: "Errors occurred: {count}",
        msg_feed_updated: "Feed updated.",
        msg_no_channel_id: "Channel id not specified.",
        msg_no_author: "Could not load author and description for this video.",
        msg_api_fail: "Failed to load YouTube player API.",
        msg_api_unavail: "Player API unavailable.",
        
        lbl_subscribers: "subscribers",
        lbl_videos: "videos",
        lbl_views: "views",
        lbl_likes: "likes",
        lbl_replies: "replies",
        lbl_comments: "comments",
        lbl_comments_unavail: "unavailable",
        lbl_comments_loading: "Loading comments...",
        lbl_comments_empty: "No comments found yet.",
        lbl_no_tags: "no tags",
        lbl_no_date: "no date",
        lbl_user: "User",
        lbl_link: "Link:",
        lbl_player_code: "Player code:",
        lbl_category: "Category:",
        lbl_tags: "Tags:",
        lbl_channel: "channel",
        lbl_no_desc: "Description not saved yet.",
        lbl_no_title: "Untitled",
        lbl_watch_video: "Watch Video",
        lbl_no_stat: "Channel data without statistics",
        lbl_no_channel_desc: "No description.",
        lbl_videos_on_page: "{count} videos on page",
        lbl_no_videos: "no videos",
        
        cat_music: "Music",
        cat_news: "News",
        cat_games: "Games",
        cat_movies: "Movies",
        cat_funny: "Funny",
        cat_review: "Review",
        cat_misc: "Misc",

        // New keys
        home_featured_title: "Fresh from your feed",
        home_latest_title: "Latest additions",
        link_all_videos: "all videos",
        link_open: "open",
        side_now_title: "Now",
        side_feed_title: "Feed",
        side_from_feed: "From your feed",
        side_random_channels: "Random channels",
        page_subs_title: "Subscription List",
        search_results_title: "Search Results",
        search_mode_subs: "In subscriptions",
        search_mode_global: "Global",
        search_mode_note: "Search in subscriptions works locally and doesn't spend API credits.",
        lbl_language: "Language",
        lbl_channels_stat: "{count} channels",
        lbl_videos_stat: "{count} videos",
        lbl_upd_stat: "upd {date}",
        lbl_comments_title: "Comments",
        lbl_more_from_channel: "More from this channel",
        lbl_similar_videos: "Similar videos",
        lbl_channel_videos: "Channel videos",
        lbl_forum_code: "Forum code:",
        lbl_blog_code: "Blog code:",
        lbl_theme: "Theme",
        theme_light: "Light",
        theme_dark: "Dark"
    },
    uk: {
        nav_video: "відео",
        nav_search: "пошук",
        nav_watch: "перегляд",
        nav_settings: "Налаштування",
        search_placeholder: "пошук відео",
        btn_search: "Пошук",
        link_home: "головна",
        link_channels: "канали",
        link_player: "плеєр",
        title_subs: "Підписки",
        input_sub_placeholder: "@handle або youtube.com/...",
        title_import: "Імпорт",
        input_import_placeholder: "Вставте посилання або JSON",
        btn_export: "Експорт JSON",
        btn_refresh: "Оновити",
        btn_refresh_start: "Запуск...",
        btn_refresh_upd: "Upd {current}/{total}",
        
        empty_feed: "Стрічка порожня. Додайте канали та натисніть «Оновити».",
        empty_new: "Немає нових відео.",
        empty_extra: "Немає додаткових відео.",
        empty_watch: "Немає відео для перегляду.",
        empty_side: "Поки порожньо.",
        empty_subs: "Список підписок поки порожній.",
        empty_subs_panel: "Підписок поки немає.",
        empty_channel: "Канал не завантажено.",
        empty_channel_videos: "Відео каналу поки недоступні.",
        empty_other_videos: "Немає інших відео цього каналу.",
        empty_recommendations: "Немає рекомендацій.",
        empty_side_details: "Немає даних для бічної панелі.",
        
        search_prompt: "Введіть запит",
        search_waiting: "Сторінка пошуку чекає на запит.",
        search_global_progress: "Йде глобальний пошук...",
        search_subs_progress: "Шукаємо за підписками...",
        search_found: "Знайдено: ",
        search_not_found_global: "За цим запитом нічого не знайдено.",
        search_not_found_subs: "За підписками нічого не знайдено. Спробуйте глобальний пошук.",
        
        page_channels: "Канали - Videoalta",
        page_search: "Пошук - Videoalta",
        page_watch: "Перегляд - Videoalta",
        page_channel: "Канал - Videoalta",
        
        stat_not_updated: "не оновлювалось",
        btn_loading: "завантаження...",
        btn_more_videos: "ще відео",
        btn_more_comments: "ще коментарі",
        btn_collapse: "Згорнути ▲",
        btn_expand: "Розгорнути ▼",
        btn_theater: "Театр",
        btn_normal: "Звичайний",
        
        msg_sub_exists: "Канал вже існує.",
        msg_sub_added: "Канал додано.",
        msg_import_res: "Імпорт: {added} додано, {skipped} пропущено, {errors} помилок",
        msg_sub_removed: "Канал видалено.",
        msg_refresh_errors: "Є помилки: {count}",
        msg_feed_updated: "Стрічка оновлена.",
        msg_no_channel_id: "Не вказано channel id.",
        msg_no_author: "Не вдалося завантажити автора та опис для цього відео.",
        msg_api_fail: "Не вдалося завантажити API плеєра YouTube.",
        msg_api_unavail: "API плеєра недоступне.",
        
        lbl_subscribers: "підписників",
        lbl_videos: "відео",
        lbl_views: "переглядів",
        lbl_likes: "лайків",
        lbl_replies: "відповідей",
        lbl_comments: "коментарів",
        lbl_comments_unavail: "недоступно",
        lbl_comments_loading: "Завантаження коментарів...",
        lbl_comments_empty: "Коментарі поки не знайдені.",
        lbl_no_tags: "немає тегів",
        lbl_no_date: "без дати",
        lbl_user: "Користувач",
        lbl_link: "Посилання:",
        lbl_player_code: "Код плеєра:",
        lbl_category: "Категорія:",
        lbl_tags: "Теги:",
        lbl_channel: "канал",
        lbl_no_desc: "Опис поки не збережено.",
        lbl_no_title: "Без назви",
        lbl_watch_video: "Перегляд відео",
        lbl_no_stat: "Дані каналу без статистики",
        lbl_no_channel_desc: "Опис відсутній.",
        lbl_videos_on_page: "{count} відео на сторінці",
        lbl_no_videos: "немає відео",
        
        cat_music: "Музика",
        cat_news: "Новини",
        cat_games: "Ігри",
        cat_movies: "Кіно",
        cat_funny: "Смішне",
        cat_review: "Огляд",
        cat_misc: "Різне",

        // New keys
        home_featured_title: "Найновіше з вашої стрічки",
        home_latest_title: "Останні додавання",
        link_all_videos: "всі відео",
        link_open: "відкрити",
        side_now_title: "Зараз",
        side_feed_title: "Стрічка",
        side_from_feed: "З вашої стрічки",
        side_random_channels: "Випадкові канали",
        page_subs_title: "Список підписок",
        search_results_title: "Результати пошуку",
        search_mode_subs: "За підписками",
        search_mode_global: "Глобальний",
        search_mode_note: "Пошук за підписками працює локально і не витрачає API-кредити.",
        lbl_language: "Мова",
        lbl_channels_stat: "{count} каналів",
        lbl_videos_stat: "{count} відео",
        lbl_upd_stat: "оновлено {date}",
        lbl_comments_title: "Коментарі",
        lbl_more_from_channel: "Ще з цього каналу",
        lbl_similar_videos: "Схожі відео",
        lbl_channel_videos: "Відео каналу",
        lbl_forum_code: "Код для форуму:",
        lbl_blog_code: "Код для блогу:",
        lbl_theme: "Тема",
        theme_light: "Світла",
        theme_dark: "Темна"
    }
};

let currentLang = window.localStorage.getItem('tuuday-lang') || 'ru';
if (!translations[currentLang]) currentLang = 'ru';

function t(key, params = {}) {
    let str = translations[currentLang][key] || translations['ru'][key] || key;
    for (const [k, v] of Object.entries(params)) {
        str = str.replace(`{${k}}`, v);
    }
    return str;
}

function setLang(lang) {
    if (translations[lang]) {
        window.localStorage.setItem('tuuday-lang', lang);
        window.location.reload();
    }
}

function applyI18nToDOM() {
    const tr = translations[currentLang];
    
    // Header Navigation
    const navLinks = document.querySelectorAll('.portal-nav a');
    if(navLinks[0]) navLinks[0].textContent = tr.nav_video;
    if(navLinks[1]) navLinks[1].textContent = tr.nav_search;
    if(navLinks[2]) navLinks[2].textContent = tr.nav_watch;
    
    const utilToggle = document.getElementById('utility-toggle');
    if(utilToggle) utilToggle.textContent = tr.nav_settings;
    
    // Search Form
    const searchInput = document.getElementById('mast-search-input');
    if(searchInput) searchInput.placeholder = tr.search_placeholder;
    
    const searchBtn = document.querySelector('.portal-searchform button');
    if(searchBtn) searchBtn.textContent = tr.btn_search;
    
    // Sub-links
    const portalLinks = document.querySelectorAll('.portal-links a');
    if(portalLinks[0]) portalLinks[0].textContent = tr.link_home;
    if(portalLinks[1]) portalLinks[1].textContent = tr.link_channels;
    if(portalLinks[2]) portalLinks[2].textContent = tr.link_player;
    
    // Utility Panel
    const utilTitles = document.querySelectorAll('.utility-title');
    if(utilTitles[0]) utilTitles[0].textContent = tr.title_subs;
    if(utilTitles[1]) utilTitles[1].textContent = tr.title_import;
    
    const quickAddInput = document.getElementById('quick-add-input');
    if(quickAddInput) quickAddInput.placeholder = tr.input_sub_placeholder;
    
    const quickImportInput = document.getElementById('quick-import-input');
    if(quickImportInput) quickImportInput.placeholder = tr.input_import_placeholder;
    
    const quickExportBtn = document.getElementById('quick-export-btn');
    if(quickExportBtn) quickExportBtn.textContent = tr.btn_export;
    
    const quickRefreshBtn = document.getElementById('quick-refresh-btn');
    if(quickRefreshBtn && !quickRefreshBtn.classList.contains('is-loading')) {
        quickRefreshBtn.textContent = tr.btn_refresh;
    }
    
    // New translatable elements
    const homeFeaturedTitle = document.querySelector('.module-box h1');
    if(homeFeaturedTitle && document.body.dataset.page === 'home') homeFeaturedTitle.textContent = tr.home_featured_title;

    const moduleLinks = document.querySelectorAll('.module-link');
    moduleLinks.forEach(link => {
        if (link.textContent.trim() === 'все видео') link.textContent = tr.link_all_videos;
        if (link.textContent.trim() === 'открыть') link.textContent = tr.link_open;
        if (link.textContent.trim() === 'поиск' && !link.href.includes('index.html')) link.textContent = tr.nav_search;
        if (link.id === 'watch-youtube-link') link.textContent = 'youtube';
        if (link.id === 'watch-channel-link') link.textContent = tr.lbl_channel;
    });

    const h2Titles = document.querySelectorAll('.module-box h2');
    h2Titles.forEach(h2 => {
        const text = h2.textContent.trim();
        if (text === 'Последние добавления') h2.textContent = tr.home_latest_title;
        if (text === 'Сейчас') h2.textContent = tr.side_now_title;
        if (text === 'Лента') h2.textContent = tr.side_feed_title;
        if (text === 'Подписки') h2.textContent = tr.title_subs;
        if (text === 'Из вашей ленты') h2.textContent = tr.side_from_feed;
        if (text === 'Случайные каналы') h2.textContent = tr.side_random_channels;
        if (text === 'Комментарии') h2.textContent = tr.lbl_comments_title;
        if (text === 'Еще с этого канала' || text === 'Ещё с этого канала') h2.textContent = tr.lbl_more_from_channel;
        if (text === 'Похожее видео') h2.textContent = tr.lbl_similar_videos;
        if (text === 'Видео канала') h2.textContent = tr.lbl_channel_videos;
    });

    const pageH1 = document.querySelector('.main-column .module-box h1');
    if (pageH1) {
        if (document.body.dataset.page === 'subscriptions' && pageH1.textContent.trim() === 'Список подписок') {
            pageH1.textContent = tr.page_subs_title;
        }
        if (document.body.dataset.page === 'search' && pageH1.textContent.trim() === 'Результаты поиска') {
            pageH1.textContent = tr.search_results_title;
        }
        if (document.body.dataset.page === 'watch' && pageH1.textContent.trim() === 'Просмотр видео') {
            pageH1.textContent = tr.lbl_watch_video;
        }
    }

    const searchModeBtns = document.querySelectorAll('.search-mode-btn');
    searchModeBtns.forEach(btn => {
        if (btn.dataset.searchMode === 'subscriptions') btn.textContent = tr.search_mode_subs;
        if (btn.dataset.searchMode === 'global') btn.textContent = tr.search_mode_global;
    });

    const searchModeNote = document.getElementById('search-mode-note');
    if (searchModeNote) searchModeNote.textContent = tr.search_mode_note;

    const watchTheaterBtn = document.getElementById('watch-theater-toggle');
    if (watchTheaterBtn) watchTheaterBtn.textContent = tr.btn_theater;

    const watchCommentsMore = document.getElementById('watch-comments-more');
    if (watchCommentsMore) watchCommentsMore.textContent = tr.btn_more_comments;

    const channelLoadMore = document.getElementById('channel-load-more');
    if (channelLoadMore) channelLoadMore.textContent = tr.btn_more_videos;

    // Language Switcher in Header
    const headActions = document.querySelector('.portal-head-actions');
    if (headActions) {
        let langDropdown = document.getElementById('lang-dropdown-container');
        if (!langDropdown) {
            langDropdown = document.createElement('div');
            langDropdown.id = 'lang-dropdown-container';
            langDropdown.className = 'lang-dropdown';
            langDropdown.innerHTML = `
                <select id="lang-select" onchange="setLang(this.value)" aria-label="${tr.lbl_language}">
                    <option value="ru" ${currentLang==='ru'?'selected':''}>RU</option>
                    <option value="en" ${currentLang==='en'?'selected':''}>EN</option>
                    <option value="uk" ${currentLang==='uk'?'selected':''}>UK</option>
                </select>
            `;
            headActions.appendChild(langDropdown);
        } else {
            const select = langDropdown.querySelector('select');
            if (select) {
                select.setAttribute('aria-label', tr.lbl_language);
                select.value = currentLang;
            }
        }
    }
}

const state = {
    subscriptions: [],
    videos: [],
    updatedAt: null,
    searchEnabled: false,
    searchMode: 'subscriptions'
};

const channelState = {
    channel: null,
    videos: [],
    nextPageToken: '',
    channelId: ''
};

const watchState = {
    current: null,
    channelVideos: [],
    comments: [],
    commentsNextPageToken: '',
    commentsTotalResults: 0,
    commentsError: '',
    sideDetailsCollapsed: true,
    chapters: [],
    player: null,
    playerReady: false,
    progressTimer: null,
    apiPromise: null,
    theaterMode: false,
    isSeeking: false
};
const homeState = {
    latestPage: 1
};

const searchState = {
    currentPage: 1,
    totalItems: 0,
    perPage: 12
};


const page = document.body.dataset.page || 'home';
const params = new URLSearchParams(window.location.search);
const THEME_STORAGE_KEY = 'tuuday-theme';
const LEGACY_THEME_STORAGE_KEY = 'tuuday-video-theme';
const fallbackThumb = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180"><rect width="100%" height="100%" fill="%23eef2f5"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23657787" font-family="Tahoma, Arial" font-size="16">video</text></svg>';
const fallbackAvatar = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44"><rect width="100%" height="100%" rx="22" ry="22" fill="%23eef2f5"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23657787" font-family="Tahoma, Arial" font-size="13">U</text></svg>';

function safeImageUrl(value, fallback = fallbackThumb) {
    const raw = String(value || '').trim();
    if (!raw) {
        return fallback;
    }
    // If we already pass the fallback value, keep it as-is.
    if (raw === fallback) {
        return fallback;
    }

    // Allow only http(s) and trusted image hosts.
    // This reduces risk from unexpected schemes (e.g. `data:`/`javascript:`) or weird redirects.
    try {
        const url = new URL(raw, window.location.href);
        const protocolOk = url.protocol === 'http:' || url.protocol === 'https:';
        if (!protocolOk) {
            return fallback;
        }

        const hostname = String(url.hostname || '').toLowerCase();
        const allowedSuffixes = [
            '.ytimg.com',
            '.ggpht.com',
            '.googleusercontent.com'
        ];
        const isAllowedHost = hostname.endsWith('.i.ytimg.com') // extra guard for common thumbnails
            ? true
            : allowedSuffixes.some((suffix) => hostname.endsWith(suffix));

        return isAllowedHost ? url.toString() : fallback;
    } catch (error) {
        return fallback;
    }
}

const elements = {
    toast: document.getElementById('toast'),
    utilityToggle: document.getElementById('utility-toggle'),
    utilityPanel: document.getElementById('utility-panel'),
    quickAddForm: document.getElementById('quick-add-form'),
    quickAddInput: document.getElementById('quick-add-input'),
    quickImportInput: document.getElementById('quick-import-input'),
    quickImportBtn: document.getElementById('quick-import-btn'),
    quickExportBtn: document.getElementById('quick-export-btn'),
    quickRefreshBtn: document.getElementById('quick-refresh-btn'),
    utilitySubscriptionList: document.getElementById('utility-subscription-list'),
    mastSearchInput: document.getElementById('mast-search-input'),
    mastSearchForm: document.querySelector('.portal-searchform'),
    statSubscriptions: document.getElementById('stat-subscriptions'),
    statVideos: document.getElementById('stat-videos'),
    statUpdated: document.getElementById('stat-updated'),
    sideSubscriptions: document.getElementById('side-subscriptions'),
    homeFeatured: document.getElementById('home-featured'),
    homeLatest: document.getElementById('home-latest'),
    homeLatestExtra: document.getElementById('home-latest-extra'),
    homeLatestHead: document.getElementById('home-latest-head'),
    homePagination: document.getElementById('home-pagination'),
    sideFeatured: document.getElementById('side-featured'),
    sideWatchLink: document.getElementById('side-watch-link'),
    sideLatest: document.getElementById('side-latest'),
    searchPageStatus: document.getElementById('search-page-status'),
    searchModeBar: document.getElementById('search-mode-bar'),
    searchModeNote: document.getElementById('search-mode-note'),
    searchPageResults: document.getElementById('search-page-results'),
    searchPagination: document.getElementById('search-pagination'),
    searchSideLatest: document.getElementById('search-side-latest'),
    subscriptionsPageStatus: document.getElementById('subscriptions-page-status'),
    subscriptionsPageList: document.getElementById('subscriptions-page-list'),
    subscriptionsSideLatest: document.getElementById('subscriptions-side-latest'),
    watchTitle: document.getElementById('watch-title'),
    watchPlayerShell: document.getElementById('watch-player-shell'),
    watchPlayerStage: document.getElementById('watch-player-stage'),
    watchPlayerFrame: document.getElementById('watch-player-frame'),
    watchPlayToggle: document.getElementById('watch-play-toggle'),
    watchMuteToggle: document.getElementById('watch-mute-toggle'),
    watchCurrentTime: document.getElementById('watch-current-time'),
    watchDurationTime: document.getElementById('watch-duration-time'),
    watchProgress: document.getElementById('watch-progress'),
    watchProgressChapters: document.getElementById('watch-progress-chapters'),
    watchVolume: document.getElementById('watch-volume'),
    watchTheaterToggle: document.getElementById('watch-theater-toggle'),
    watchFullscreenToggle: document.getElementById('watch-fullscreen-toggle'),
    watchYoutubeLink: document.getElementById('watch-youtube-link'),
    watchMetaLine: document.getElementById('watch-meta-line'),
    watchDescription: document.getElementById('watch-description'),
    watchComments: document.getElementById('watch-comments'),
    watchCommentsNote: document.getElementById('watch-comments-note'),
    watchCommentsMore: document.getElementById('watch-comments-more'),
    watchRecommendations: document.getElementById('watch-recommendations'),
    watchSideDetails: document.getElementById('watch-side-details'),
    watchChannelLink: document.getElementById('watch-channel-link'),
    watchChannelVideos: document.getElementById('watch-channel-videos'),
    watchLayout: document.getElementById('watch-layout'),
    watchStageBox: document.getElementById('watch-stage-box'),
    channelHero: document.getElementById('channel-hero'),
    channelVideoList: document.getElementById('channel-video-list'),
    channelVideoNote: document.getElementById('channel-video-note'),
    channelLoadMore: document.getElementById('channel-load-more'),
    channelSideLatest: document.getElementById('channel-side-latest')
};

function showToast(message, timeout = 2600) {
    if (!elements.toast) {
        return;
    }

    elements.toast.hidden = false;
    elements.toast.textContent = message;
    window.clearTimeout(showToast.timerId);
    showToast.timerId = window.setTimeout(() => {
        elements.toast.hidden = true;
    }, timeout);
}

function getStoredTheme() {
    try {
        const sharedValue = window.localStorage.getItem(THEME_STORAGE_KEY) || '';

        if (sharedValue === 'dark' || sharedValue === 'light') {
            return sharedValue;
        }

        const legacyValue = window.localStorage.getItem(LEGACY_THEME_STORAGE_KEY) || '';
        return legacyValue === 'dark' || legacyValue === 'light' ? legacyValue : '';
    } catch (error) {
        return '';
    }
}

function getPreferredTheme() {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
        return storedTheme;
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }

    return 'light';
}

function updateThemeToggleLabel() {
    const isDark = document.body.classList.contains('theme-dark');
    const themeToggle = document.getElementById('theme-toggle');

    if (!themeToggle) {
        return;
    }

    const themeLabel = t('lbl_theme');
    const modeLabel = isDark ? t('theme_dark') : t('theme_light');
    themeToggle.textContent = `${themeLabel}: ${modeLabel}`;
    themeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    themeToggle.title = 'toggle theme';
}

function applyTheme(theme, persist = true) {
    const normalized = theme === 'dark' ? 'dark' : 'light';
    document.body.classList.toggle('theme-dark', normalized === 'dark');
    document.body.dataset.theme = normalized;

    if (persist) {
        try {
            window.localStorage.setItem(THEME_STORAGE_KEY, normalized);
            window.localStorage.setItem(LEGACY_THEME_STORAGE_KEY, normalized);
        } catch (error) {
            // Ignore storage failures and keep the in-memory theme.
        }
    }

    updateThemeToggleLabel();
}

function initTheme() {
    const headActions = document.querySelector('.portal-head-actions');

    if (headActions && !document.getElementById('theme-toggle')) {
        const themeToggle = document.createElement('button');
        themeToggle.type = 'button';
        themeToggle.id = 'theme-toggle';
        themeToggle.className = 'small-action theme-toggle-btn';
        themeToggle.addEventListener('click', () => {
            applyTheme(document.body.classList.contains('theme-dark') ? 'light' : 'dark');
        });
        headActions.insertBefore(themeToggle, headActions.firstChild || null);
    }

    applyTheme(getPreferredTheme(), false);
}

function escapeHtml(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function formatDateShort(value) {
    if (!value) {
        return 'нет даты';
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return new Intl.DateTimeFormat('ru-RU', {
        dateStyle: 'short',
        timeStyle: 'short'
    }).format(date);
}

function formatCount(value) {
    const number = Number(value || 0);
    if (!number) {
        return '';
    }

    return new Intl.NumberFormat('ru-RU').format(number);
}

function requestJson(url, options) {
    return fetch(url, options).then(async (response) => {
        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
            throw new Error(payload.error || 'Ошибка запроса.');
        }

        return payload;
    });
}

function buildEmbedUrl(videoId, startSeconds = 0) {
    const paramsForPlayer = new URLSearchParams({
        autoplay: '1',
        rel: '0',
        playsinline: '1',
        controls: '0',
        enablejsapi: '1',
        modestbranding: '1',
        iv_load_policy: '3',
        fs: '0',
        disablekb: '1'
    });

    if (window.location.origin) {
        paramsForPlayer.set('origin', window.location.origin);
    }

    if (startSeconds > 0) {
        paramsForPlayer.set('start', String(startSeconds));
    }

    return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?${paramsForPlayer.toString()}`;
}

function buildChannelUrl(channelId) {
    return `channel.html?id=${encodeURIComponent(channelId || '')}`;
}

function buildWatchUrl(video) {
    const query = new URLSearchParams({
        v: video.id || ''
    });

    return `watch.html?${query.toString()}`;
}

function buildSearchUrl(query) {
    return `search.html?q=${encodeURIComponent(query || '')}`;
}

function formatSidebarDate(value) {
    if (!value) {
        return 'без даты';
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
}

function buildWatchSharePayload(video) {
    const videoId = video.id || '';
    const shareUrl = `http://videoalta.lcl/video/watch?v=${videoId}`;
    const playerUrl = `http://videoalta.lcl/player.swf?v=${videoId}`;

    return {
        link: shareUrl,
        embedCode: `<object id="player" width="585" height="345"><param name="movie" value="${playerUrl}"></param><param name="allowFullScreen" value="true"></param><embed src="${playerUrl}" width="585" height="345" align="middle" allowfullscreen="true"></embed></object>`,
        forumCode: `<object id="player" width="480" height="360"><param name="movie" value="${playerUrl}"></param><embed src="${playerUrl}" width="480" height="360" align="middle"></embed></object>`,
        blogCode: playerUrl
    };
}

function inferWatchCategory(video) {
    const haystack = `${video && video.title || ''} ${video && video.description || ''}`.toLowerCase();
    const rules = [
        [t('cat_music'), /(музык|клип|song|music|concert|cover|remix)/i],
        [t('cat_news'), /(новост|news|репортаж|событ|политик)/i],
        [t('cat_games'), /(игр|game|gaming|стрим|stream|minecraft|cs2|dota)/i],
        [t('cat_movies'), /(фильм|кино|сериал|movie|trailer|трейлер)/i],
        [t('cat_funny'), /(смешн|прикол|юмор|funny|meme|fail)/i],
        [t('cat_review'), /(обзор|review|распаковк|guide|урок|tutorial|how to)/i]
    ];

    const match = rules.find((entry) => entry[1].test(haystack));
    return match ? match[0] : t('cat_misc');
}

function collectWatchTags(video) {
    const stopWords = new Set([
        'это',
        'как',
        'для',
        'или',
        'что',
        'this',
        'with',
        'from',
        'your',
        'video',
        'канал',
        'videoalta'
    ]);
    const tags = [];
    const pushTag = (value) => {
        const normalized = String(value || '').trim().replace(/^#+/, '').toLowerCase();
        if (!normalized || normalized.length < 3 || stopWords.has(normalized) || tags.includes(normalized)) {
            return;
        }
        tags.push(normalized);
    };
    const text = `${video && video.title || ''} ${video && video.description || ''} ${video && video.channelTitle || ''}`;
    const hashtags = text.match(/#[^\s#.,!?]+/g) || [];
    const words = text.match(/[A-Za-zА-Яа-яЁё0-9]{3,}/g) || [];

    hashtags.forEach(pushTag);
    words.forEach(pushTag);

    if (!tags.length && video && video.channelTitle) {
        pushTag(video.channelTitle);
    }

    return tags.slice(0, 4);
}

function extractYoutubeVideoId(value) {
    const trimmed = String(value || '').trim();

    if (!trimmed) {
        return '';
    }

    if (/^[\w-]{11}$/.test(trimmed)) {
        return trimmed;
    }

    const match = trimmed.match(/(?:[?&](?:v|vi)=|youtu\.be\/|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/i);
    return match ? match[1] : '';
}

function normalizeVideo(video) {
    return {
        id: video.id || '',
        channelId: video.channelId || '',
        title: video.title || 'Без названия',
        channelTitle: video.channelTitle || 'YouTube',
        publishedAt: video.publishedAt || '',
        description: video.description || '',
        videoUrl: video.videoUrl || (video.id ? `https://www.youtube.com/watch?v=${video.id}` : '#'),
        embedUrl: video.embedUrl || (video.id ? buildEmbedUrl(video.id) : ''),
        isShort: Boolean(video.isShort) || isShortVideo(video),
        thumbnail: safeImageUrl(video.thumbnail || fallbackThumb, fallbackThumb)
    };
}

function isShortVideo(video) {
    const url = String(video && video.videoUrl || '').toLowerCase();
    const title = String(video && video.title || '').toLowerCase();
    const description = String(video && video.description || '').toLowerCase();

    return url.includes('/shorts/') || /#[^\s#]*shorts\b/.test(title) || /#[^\s#]*shorts\b/.test(description);
}

function filterSupportedVideos(videos) {
    return (videos || []).map(normalizeVideo).filter((video) => !video.isShort);
}

function emptyBlock(text) {
    return `<div class="portal-empty">${escapeHtml(text)}</div>`;
}

function parseTimestampToSeconds(value) {
    const parts = String(value || '').split(':').map((part) => Number(part));

    if (parts.some((part) => Number.isNaN(part))) {
        return 0;
    }

    if (parts.length === 3) {
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }

    if (parts.length === 2) {
        return parts[0] * 60 + parts[1];
    }

    return 0;
}

function formatTextWithTimestamps(text) {
    const escaped = escapeHtml(text || '');
    const withLinks = escaped.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
    const withTimestamps = withLinks.replace(/(^|[\s>(])((?:\d{1,2}:)?\d{1,2}:\d{2})(?=$|[\s)<.,!?])/gm, (match, prefix, stamp) => {
        const seconds = parseTimestampToSeconds(stamp);
        return `${prefix}<a href="#" class="watch-timestamp" data-seconds="${seconds}">${stamp}</a>`;
    });

    return withTimestamps.replace(/\r?\n/g, '<br>');
}

function formatDescriptionHtml(text) {
    return formatTextWithTimestamps(text || 'Описание пока не сохранено.');
}

function formatCommentHtml(text) {
    return formatTextWithTimestamps(text || '');
}

function formatPlayerTime(totalSeconds) {
    const safe = Math.max(0, Math.floor(Number(totalSeconds) || 0));
    const hours = Math.floor(safe / 3600);
    const minutes = Math.floor((safe % 3600) / 60);
    const seconds = safe % 60;

    if (hours > 0) {
        return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function paintRange(input, ratio, fillColor, restColor) {
    if (!input) {
        return;
    }

    const safe = Math.max(0, Math.min(1, Number(ratio) || 0));
    const percent = (safe * 100).toFixed(2);
    input.style.background = `linear-gradient(to right, ${fillColor} 0%, ${fillColor} ${percent}%, ${restColor} ${percent}%, ${restColor} 100%)`;
}

function normalizeSearchMode(mode) {
    return mode === 'global' && state.searchEnabled ? 'global' : 'subscriptions';
}

function syncSearchForms() {
    document.querySelectorAll('.portal-searchform').forEach((form) => {
        let hidden = form.querySelector('input[name="mode"]');
        if (!hidden) {
            hidden = document.createElement('input');
            hidden.type = 'hidden';
            hidden.name = 'mode';
            form.appendChild(hidden);
        }
        hidden.value = state.searchMode;
    });
}

function renderSearchModeBar() {
    if (!elements.searchModeBar) {
        syncSearchForms();
        return;
    }

    elements.searchModeBar.querySelectorAll('[data-search-mode]').forEach((button) => {
        const mode = button.getAttribute('data-search-mode');
        const disabled = mode === 'global' && !state.searchEnabled;
        button.classList.toggle('is-active', mode === state.searchMode);
        button.disabled = disabled;
    });

    if (elements.searchModeNote) {
        elements.searchModeNote.textContent = state.searchMode === 'global'
            ? '\u0413\u043b\u043e\u0431\u0430\u043b\u044c\u043d\u044b\u0439 \u043f\u043e\u0438\u0441\u043a \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u0442 API \u0438 \u0442\u0440\u0430\u0442\u0438\u0442 \u043a\u0440\u0435\u0434\u0438\u0442\u044b.'
            : '\u041f\u043e\u0438\u0441\u043a \u043f\u043e \u043f\u043e\u0434\u043f\u0438\u0441\u043a\u0430\u043c \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0442 \u043b\u043e\u043a\u0430\u043b\u044c\u043d\u043e \u0438 \u043d\u0435 \u0442\u0440\u0430\u0442\u0438\u0442 API-\u043a\u0440\u0435\u0434\u0438\u0442\u044b.';
    }

    syncSearchForms();
}

function applySearchMode(mode, shouldRefresh = false) {
    state.searchMode = normalizeSearchMode(mode || state.searchMode);
    window.localStorage.setItem('tuuday-video-search-mode', state.searchMode);
    renderSearchModeBar();

    if (page === 'search') {
        const nextUrl = new URL(window.location.href);
        nextUrl.searchParams.set('mode', state.searchMode);
        window.history.replaceState({}, '', nextUrl.toString());

        if (shouldRefresh) {
            renderSearchPage().catch((error) => {
                showToast(error.message, 3800);
            });
        }
    }
}

function isTypingTarget(target) {
    if (!target || !(target instanceof HTMLElement)) {
        return false;
    }

    return Boolean(target.closest('input, textarea, select, button, [contenteditable=""], [contenteditable="true"]'));
}

function toggleWatchPlayback() {
    if (!watchState.playerReady || !watchState.player) {
        return;
    }

    const stateCode = watchState.player.getPlayerState();
    if ([1, 3].includes(stateCode)) {
        watchState.player.pauseVideo();
    } else {
        watchState.player.playVideo();
    }
    syncWatchControls();
}

function seekWatchRelative(deltaSeconds) {
    if (!watchState.playerReady || !watchState.player || typeof watchState.player.getCurrentTime !== 'function') {
        return;
    }

    const currentTime = Number(watchState.player.getCurrentTime()) || 0;
    setWatchPlayerTime(currentTime + deltaSeconds);
}

async function toggleWatchFullscreen() {
    const target = elements.watchPlayerShell || elements.watchPlayerStage;
    if (!target) {
        return;
    }

    if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
    }

    if (document.fullscreenElement) {
        await document.exitFullscreen().catch(() => {});
    } else {
        const request = typeof target.requestFullscreen === 'function'
            ? target.requestFullscreen()
            : Promise.resolve();
        await Promise.resolve(request).catch(() => {});
    }

    if (typeof target.focus === 'function') {
        target.focus({ preventScroll: true });
    }
}

function toggleWatchMute() {
    if (!watchState.playerReady || !watchState.player || typeof watchState.player.mute !== 'function') {
        return;
    }

    if (watchState.player.isMuted()) {
        watchState.player.unMute();
    } else {
        watchState.player.mute();
    }
    syncWatchControls();
}

function changeWatchVolume(delta) {
    if (!watchState.playerReady || !watchState.player || typeof watchState.player.setVolume !== 'function') {
        return;
    }

    const currentVolume = watchState.player.getVolume();
    const newVolume = Math.max(0, Math.min(100, currentVolume + delta));
    watchState.player.setVolume(newVolume);

    if (newVolume > 0 && watchState.player.isMuted()) {
        watchState.player.unMute();
    }

    syncWatchControls();
}

function changeWatchPlaybackRate(delta) {
    if (!watchState.playerReady || !watchState.player || typeof watchState.player.getPlaybackRate !== 'function') {
        return;
    }

    const rates = watchState.player.getAvailablePlaybackRates();
    const currentRate = watchState.player.getPlaybackRate();
    const currentIndex = rates.indexOf(currentRate);

    if (currentIndex === -1) return;

    const nextIndex = currentIndex + delta;
    if (nextIndex >= 0 && nextIndex < rates.length) {
        watchState.player.setPlaybackRate(rates[nextIndex]);
        showToast(`Speed: ${rates[nextIndex]}x`, 1000);
    }
}

function handleWatchKeyboardShortcuts(event) {
    if (page !== 'watch' || !watchState.current || !watchState.current.id) {
        return;
    }

    // Don't trigger if typing in an input, textarea, etc.
    if (event.altKey || event.ctrlKey || event.metaKey || isTypingTarget(event.target)) {
        return;
    }

    const key = String(event.key || '');
    const lowerKey = key.toLowerCase();
    const code = event.code;

    // Numbers 0-9 to jump to percentage
    if (/^[0-9]$/.test(key) && watchState.playerReady && watchState.player) {
        const duration = Number(watchState.player.getDuration && watchState.player.getDuration()) || 0;
        if (duration > 0) {
            event.preventDefault();
            setWatchPlayerTime(duration * (Number(key) / 10));
        }
        return;
    }

    // Space or K: Play/Pause
    if (code === 'Space' || code === 'KeyK' || lowerKey === 'k' || lowerKey === 'л') {
        event.preventDefault();
        toggleWatchPlayback();
        return;
    }

    // J: Back 10s
    if (code === 'KeyJ' || lowerKey === 'j' || lowerKey === 'о') {
        event.preventDefault();
        seekWatchRelative(-10);
        return;
    }

    // L: Forward 10s
    if (code === 'KeyL' || lowerKey === 'l' || lowerKey === 'д') {
        event.preventDefault();
        seekWatchRelative(10);
        return;
    }

    // Arrows: Left/Right (5s), Up/Down (Volume)
    if (code === 'ArrowLeft') {
        event.preventDefault();
        seekWatchRelative(-5);
        return;
    }
    if (code === 'ArrowRight') {
        event.preventDefault();
        seekWatchRelative(5);
        return;
    }
    if (code === 'ArrowUp') {
        event.preventDefault();
        changeWatchVolume(5);
        return;
    }
    if (code === 'ArrowDown') {
        event.preventDefault();
        changeWatchVolume(-5);
        return;
    }

    // M: Mute
    if (code === 'KeyM' || lowerKey === 'm' || lowerKey === 'ь') {
        event.preventDefault();
        toggleWatchMute();
        return;
    }

    // F: Fullscreen
    if (code === 'KeyF' || lowerKey === 'f' || lowerKey === 'а') {
        event.preventDefault();
        void toggleWatchFullscreen();
        return;
    }

    // T: Theater mode
    if (code === 'KeyT' || lowerKey === 't' || lowerKey === 'е') {
        event.preventDefault();
        applyTheaterMode(!watchState.theaterMode);
        return;
    }

    // Home / End
    if (code === 'Home') {
        event.preventDefault();
        setWatchPlayerTime(0);
        return;
    }
    if (code === 'End' && watchState.playerReady && watchState.player) {
        event.preventDefault();
        const duration = watchState.player.getDuration();
        setWatchPlayerTime(duration - 0.1);
        return;
    }

    // < and > for playback rate (Shift + , or .)
    if (event.shiftKey) {
        if (key === '<' || key === ',') {
            event.preventDefault();
            changeWatchPlaybackRate(-1);
            return;
        }
        if (key === '>' || key === '.') {
            event.preventDefault();
            changeWatchPlaybackRate(1);
            return;
        }
    }

    // . and , for frame-by-frame (when paused)
    if (key === '.' || key === 'ю') {
        seekWatchRelative(0.04); // roughly 1 frame at 25fps
        return;
    }
    if (key === ',' || key === 'б') {
        seekWatchRelative(-0.04);
        return;
    }
}

function extractDescriptionChapters(text) {
    const lines = String(text || '').split(/\r?\n/);
    const seen = new Set();
    const chapters = [];

    lines.forEach((line) => {
        const match = line.match(/(^|\s)((?:\d{1,2}:)?\d{1,2}:\d{2})(?=\s|$)/);
        if (!match) {
            return;
        }

        const stamp = match[2];
        const seconds = parseTimestampToSeconds(stamp);
        if (!seconds || seen.has(seconds)) {
            return;
        }

        seen.add(seconds);
        chapters.push({
            seconds,
            stamp,
            label: line.replace(stamp, '').trim() || stamp
        });
    });

    return chapters.sort((a, b) => a.seconds - b.seconds);
}

function syncWatchChapterMarkers(currentTime, duration) {
    const chapters = Array.isArray(watchState.chapters) ? watchState.chapters : [];

    if (!elements.watchProgressChapters || !chapters.length || duration <= 0) {
        return;
    }

    const activeIndex = chapters.findIndex((chapter, index) => {
        const next = chapters[index + 1];
        return currentTime >= chapter.seconds && (!next || currentTime < next.seconds);
    });

    elements.watchProgressChapters.querySelectorAll('.watch-chapter-mark').forEach((node, index) => {
        node.classList.toggle('is-active', index === activeIndex);
    });
}

function renderWatchChapters(description, duration = 0) {
    if (!elements.watchProgressChapters) {
        return;
    }

    watchState.chapters = extractDescriptionChapters(description);
    if (!watchState.chapters.length || duration <= 0) {
        elements.watchProgressChapters.innerHTML = '';
        return;
    }

    elements.watchProgressChapters.innerHTML = watchState.chapters.map((chapter) => {
        const left = Math.max(0, Math.min(100, (chapter.seconds / duration) * 100));
        return `<button type="button" class="watch-chapter-mark" style="left:${left}%" title="${escapeHtml(chapter.stamp)} ${escapeHtml(chapter.label)}" data-seconds="${chapter.seconds}"></button>`;
    }).join('');

    elements.watchProgressChapters.querySelectorAll('.watch-chapter-mark').forEach((node) => {
        node.addEventListener('click', () => {
            setWatchPlayerTime(node.dataset.seconds);
        });
    });
}

function syncWatchControls() {
    const player = watchState.player;
    const hasPlayer = watchState.playerReady && player;
    let currentTime = 0;
    let duration = 0;
    let volumeRatio = (Number(elements.watchVolume && elements.watchVolume.value) || 65) / 100;
    let isMuted = false;
    let isPlaying = false;

    if (hasPlayer) {
        try {
            currentTime = Number(player.getCurrentTime()) || 0;
            duration = Number(player.getDuration()) || 0;
            volumeRatio = Math.max(0, Math.min(1, (Number(player.getVolume()) || 0) / 100));
            isMuted = Boolean(player.isMuted());
            isPlaying = [1, 3].includes(player.getPlayerState());
        } catch (error) {
            // fallback values are already set
        }
    }

    if (elements.watchPlayToggle) {
        elements.watchPlayToggle.classList.toggle('is-playing', isPlaying);
    }

    if (elements.watchMuteToggle) {
        elements.watchMuteToggle.classList.toggle('is-muted', isMuted || volumeRatio <= 0.001);
    }

    if (elements.watchDurationTime) {
        elements.watchDurationTime.textContent = formatPlayerTime(duration);
    }

    if (elements.watchProgress) {
        if (!watchState.isSeeking) {
            elements.watchProgress.value = duration ? String(Math.round((currentTime / duration) * 1000)) : '0';
        }

        const seekRatio = watchState.isSeeking
            ? Number(elements.watchProgress.value || 0) / 1000
            : (duration ? currentTime / duration : 0);

        const shownSeconds = watchState.isSeeking ? duration * seekRatio : currentTime;

        if (elements.watchCurrentTime) {
            elements.watchCurrentTime.textContent = formatPlayerTime(shownSeconds);
        }

        paintRange(elements.watchProgress, seekRatio, '#5f89b8', '#c8d6e3');
        syncWatchChapterMarkers(currentTime, duration);
    } else if (elements.watchCurrentTime) {
        elements.watchCurrentTime.textContent = formatPlayerTime(currentTime);
    }

    if (elements.watchVolume && document.activeElement !== elements.watchVolume) {
        elements.watchVolume.value = String(Math.round(volumeRatio * 100));
    }

    const shownVolume = elements.watchVolume ? Number(elements.watchVolume.value || 0) / 100 : volumeRatio;
    paintRange(elements.watchVolume, shownVolume, '#849eb7', '#d3dce5');
}

function startWatchProgressLoop() {
    window.clearInterval(watchState.progressTimer);
    watchState.progressTimer = window.setInterval(syncWatchControls, 250);
}

function loadYouTubeIframeApi() {
    if (watchState.apiPromise) {
        return watchState.apiPromise;
    }

    if (window.YT && typeof window.YT.Player === 'function') {
        watchState.apiPromise = Promise.resolve(window.YT);
        return watchState.apiPromise;
    }

    watchState.apiPromise = new Promise((resolve, reject) => {
        let settled = false;
        const previous = window.onYouTubeIframeAPIReady;
        const finish = () => {
            if (settled) {
                return;
            }
            settled = true;
            resolve(window.YT);
        };

        window.onYouTubeIframeAPIReady = () => {
            if (typeof previous === 'function') {
                previous();
            }
            finish();
        };

        const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
        if (!existingScript) {
            const script = document.createElement('script');
            script.src = 'https://www.youtube.com/iframe_api';
            script.async = true;
            script.onerror = () => {
                if (!settled) {
                    settled = true;
                    reject(new Error('Не удалось загрузить API плеера YouTube.'));
                }
            };
            document.head.appendChild(script);
        }

        window.setTimeout(() => {
            if (!settled && window.YT && typeof window.YT.Player === 'function') {
                finish();
            }
        }, 4000);
    });

    return watchState.apiPromise;
}

async function ensureWatchPlayer(videoId, startSeconds = 0) {
    if (!elements.watchPlayerFrame || !videoId) {
        return;
    }

    const fallbackUrl = buildEmbedUrl(videoId, startSeconds);
    if (elements.watchPlayerFrame.src !== fallbackUrl && !watchState.player) {
        elements.watchPlayerFrame.src = fallbackUrl;
    }

    try {
        await loadYouTubeIframeApi();

        if (!(window.YT && typeof window.YT.Player === 'function')) {
            throw new Error('API плеера недоступно.');
        }

        if (!watchState.player) {
            watchState.player = new window.YT.Player('watch-player-frame', {
                host: 'https://www.youtube-nocookie.com',
                videoId,
                playerVars: {
                    autoplay: 1,
                    rel: 0,
                    playsinline: 1,
                    controls: 0,
                    modestbranding: 1,
                    enablejsapi: 1,
                    iv_load_policy: 3,
                    fs: 0,
                    start: startSeconds,
                    origin: window.location.origin
                },
                events: {
                    onReady: (event) => {
                        watchState.playerReady = true;
                        const savedVolume = Number(window.localStorage.getItem('tuuday-video-volume') || '65');
                        const safeVolume = Math.max(0, Math.min(100, Number.isFinite(savedVolume) ? savedVolume : 65));
                        event.target.setVolume(safeVolume);
                        if (safeVolume <= 0) {
                            event.target.mute();
                        } else {
                            event.target.unMute();
                        }
                        if (startSeconds > 0) {
                            event.target.seekTo(startSeconds, true);
                        }
                        event.target.playVideo();
                        syncWatchControls();
                        renderWatchChapters(watchState.current && watchState.current.description, Number(event.target.getDuration()) || 0);
                        startWatchProgressLoop();
                    },
                    onStateChange: () => {
                        watchState.playerReady = true;
                        syncWatchControls();
                        renderWatchChapters(watchState.current && watchState.current.description, Number(watchState.player && watchState.player.getDuration ? watchState.player.getDuration() : 0) || 0);
                    },
                    onError: () => {
                        elements.watchPlayerFrame.src = fallbackUrl;
                    }
                }
            });
            return;
        }

        if (watchState.playerReady && typeof watchState.player.loadVideoById === 'function') {
            watchState.player.loadVideoById({
                videoId,
                startSeconds
            });
            syncWatchControls();
            return;
        }
    } catch (error) {
        elements.watchPlayerFrame.src = fallbackUrl;
        return;
    }

    elements.watchPlayerFrame.src = fallbackUrl;
}

function setWatchPlayerTime(seconds) {
    if (!watchState.current || !watchState.current.id || !elements.watchPlayerFrame) {
        return;
    }

    const safeSeconds = Math.max(0, Number(seconds) || 0);

    if (watchState.playerReady && watchState.player && typeof watchState.player.seekTo === 'function') {
        watchState.player.seekTo(safeSeconds, true);
        if (typeof watchState.player.playVideo === 'function') {
            watchState.player.playVideo();
        }
        syncWatchControls();
    } else {
        elements.watchPlayerFrame.src = buildEmbedUrl(watchState.current.id, safeSeconds);
    }
}

function bindWatchTimestampLinks(container) {
    if (!container) {
        return;
    }

    container.querySelectorAll('.watch-timestamp').forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            setWatchPlayerTime(link.dataset.seconds);
        });
    });
}

function bindWatchDescription() {
    bindWatchTimestampLinks(elements.watchDescription);
}

function updateWatchTheaterMetrics() {
    if (!elements.watchLayout) {
        return;
    }

    if (!watchState.theaterMode || !elements.watchStageBox) {
        elements.watchLayout.style.removeProperty('--watch-stage-offset');
        return;
    }

    elements.watchLayout.style.setProperty('--watch-stage-offset', `${elements.watchStageBox.offsetHeight + 12}px`);
}

function applyTheaterMode(enabled) {
    watchState.theaterMode = Boolean(enabled);
    document.body.classList.toggle('watch-theater', watchState.theaterMode);

    if (elements.watchTheaterToggle) {
        elements.watchTheaterToggle.textContent = watchState.theaterMode ? t('btn_normal') : t('btn_theater');
    }

    updateWatchTheaterMetrics();

    window.localStorage.setItem('tuuday-watch-theater', watchState.theaterMode ? '1' : '0');
}

function initWatchPlayerControls() {
    if (!elements.watchPlayerFrame) {
        return;
    }

    applyTheaterMode(window.localStorage.getItem('tuuday-watch-theater') === '1');
    window.addEventListener('resize', updateWatchTheaterMetrics);
    syncWatchControls();

    if (elements.watchPlayerShell) {
        elements.watchPlayerShell.setAttribute('tabindex', '-1');
    }

    if (elements.watchPlayToggle) {
        elements.watchPlayToggle.addEventListener('click', () => {
            if (!watchState.playerReady || !watchState.player) {
                return;
            }

            toggleWatchPlayback();
        });
    }

    if (elements.watchMuteToggle) {
        elements.watchMuteToggle.addEventListener('click', () => {
            toggleWatchMute();
        });
    }

    if (elements.watchProgress) {
        elements.watchProgress.addEventListener('input', () => {
            watchState.isSeeking = true;
            syncWatchControls();
        });

        elements.watchProgress.addEventListener('change', () => {
            watchState.isSeeking = false;
            if (!watchState.playerReady || !watchState.player) {
                return;
            }

            const duration = Number(watchState.player.getDuration()) || 0;
            const seconds = duration * (Number(elements.watchProgress.value || 0) / 1000);
            setWatchPlayerTime(seconds);
        });

        elements.watchProgress.addEventListener('blur', () => {
            watchState.isSeeking = false;
            syncWatchControls();
        });
    }

    if (elements.watchVolume) {
        elements.watchVolume.addEventListener('input', () => {
            const value = Math.max(0, Math.min(100, Number(elements.watchVolume.value) || 0));
            paintRange(elements.watchVolume, value / 100, '#849eb7', '#d3dce5');
            window.localStorage.setItem('tuuday-video-volume', String(value));

            if (!watchState.playerReady || !watchState.player) {
                return;
            }

            watchState.player.setVolume(value);
            if (value <= 0) {
                watchState.player.mute();
            } else {
                watchState.player.unMute();
            }
            syncWatchControls();
        });
    }

    if (elements.watchTheaterToggle) {
        elements.watchTheaterToggle.addEventListener('click', () => {
            applyTheaterMode(!watchState.theaterMode);
        });
    }

    if (elements.watchFullscreenToggle) {
        elements.watchFullscreenToggle.addEventListener('click', async () => {
            await toggleWatchFullscreen();
        });
    }

    // Refocus the shell when clicking near the player to ensure hotkeys work
    if (elements.watchPlayerShell) {
        elements.watchPlayerShell.addEventListener('click', (e) => {
            if (e.target === elements.watchPlayerShell) {
                elements.watchPlayerShell.focus({ preventScroll: true });
            }
        }, true);
    }
}
async function loadWatchChannelVideos(channelId, currentVideoId) {
    let videos = state.videos.filter((video) => video.channelId === channelId && video.id !== currentVideoId);

    if (videos.length < 9 && channelId) {
        try {
            const payload = await requestJson(`/api/video/channel?id=${encodeURIComponent(channelId)}`);
            const remoteVideos = filterSupportedVideos(payload.videos || []).filter((video) => video.id !== currentVideoId);
            const merged = [...videos, ...remoteVideos];
            const unique = [];
            const seen = new Set();

            for (const video of merged) {
                if (!video.id || seen.has(video.id)) {
                    continue;
                }
                seen.add(video.id);
                unique.push(video);
            }

            videos = unique;
        } catch (error) {
            // leave local fallback only
        }
    }

    return videos.slice(0, 9);
}

function renderWatchChannelVideos(videos) {
    if (!elements.watchChannelVideos) {
        return;
    }

    elements.watchChannelVideos.innerHTML = videos.length
        ? videos.slice(0, 9).map(denseCard).join('')
        : emptyBlock(t('empty_other_videos'));
}

function getWatchSidebarAvatar(video) {
    const subscription = state.subscriptions.find((item) => item.channelId && item.channelId === (video && video.channelId));
    return safeImageUrl(subscription && subscription.thumbnail || fallbackAvatar, fallbackAvatar);
}

function bindWatchSideDetailsControls() {
    if (!elements.watchSideDetails) {
        return;
    }

    const toggle = elements.watchSideDetails.querySelector('[data-watch-side-toggle]');
    if (toggle) {
        toggle.addEventListener('click', () => {
            watchState.sideDetailsCollapsed = !watchState.sideDetailsCollapsed;
            renderWatchSideDetails();
        });
    }

    elements.watchSideDetails.querySelectorAll('.watch-side-details-field').forEach((field) => {
        const selectField = () => {
            try {
                field.focus();
                field.select();
                if (typeof field.setSelectionRange === 'function') {
                    field.setSelectionRange(0, field.value.length);
                }
            } catch (error) {
                // Ignore selection failures for readonly fields.
            }
        };

        field.addEventListener('focus', selectField);
        field.addEventListener('click', selectField);
    });
}

function renderWatchSideDetails() {
    if (!elements.watchSideDetails) {
        return;
    }

    const current = watchState.current;
    if (!current) {
        elements.watchSideDetails.innerHTML = emptyBlock(t('empty_side_details'));
        return;
    }

    const sharePayload = buildWatchSharePayload(current);
    const category = inferWatchCategory(current);
    const tags = collectWatchTags(current);
    const channelMarkup = current.channelId
        ? `<a class="watch-side-details-channel" href="${buildChannelUrl(current.channelId)}">${escapeHtml(current.channelTitle || 'YouTube')}</a>`
        : `<span class="watch-side-details-channel">${escapeHtml(current.channelTitle || 'YouTube')}</span>`;
    const tagsMarkup = tags.length
        ? tags.map((tag) => `<a href="${buildSearchUrl(tag)}">${escapeHtml(tag)}</a>`).join(', ')
        : `<span>${t('lbl_no_tags')}</span>`;

    elements.watchSideDetails.innerHTML = `
        <section class="watch-side-details-card${watchState.sideDetailsCollapsed ? ' is-collapsed' : ''}">
            <div class="watch-side-details-head">
                <img class="watch-side-details-avatar" src="${escapeHtml(getWatchSidebarAvatar(current))}" alt="${escapeHtml(current.channelTitle || 'YouTube')}">
                <div class="watch-side-details-copy">
                    ${channelMarkup}
                    <div class="watch-side-details-title">${t('lbl_user')}</div>
                </div>
                <div class="watch-side-details-date">${escapeHtml(formatSidebarDate(current.publishedAt))}</div>
            </div>
            <div class="watch-side-details-body">
                <label class="watch-side-details-row">
                    <span>${t('lbl_link')}</span>
                    <input class="watch-side-details-field" type="text" readonly spellcheck="false" value="${escapeHtml(sharePayload.link)}">
                </label>
                <label class="watch-side-details-row is-multiline">
                    <span>${t('lbl_player_code')}</span>
                    <textarea class="watch-side-details-field watch-side-details-textarea" readonly spellcheck="false" rows="3">${escapeHtml(sharePayload.embedCode)}</textarea>
                </label>
                <label class="watch-side-details-row is-multiline">
                    <span>${t('lbl_forum_code')}</span>
                    <textarea class="watch-side-details-field watch-side-details-textarea" readonly spellcheck="false" rows="3">${escapeHtml(sharePayload.forumCode)}</textarea>
                </label>
                <label class="watch-side-details-row">
                    <span>${t('lbl_blog_code')}</span>
                    <input class="watch-side-details-field" type="text" readonly spellcheck="false" value="${escapeHtml(sharePayload.blogCode)}">
                </label>
            </div>
            <div class="watch-side-details-meta">
                <div class="watch-side-details-meta-row">
                    <span>${t('lbl_category')}</span>
                    <a href="${buildSearchUrl(category)}">${escapeHtml(category)}</a>
                </div>
                <div class="watch-side-details-meta-row">
                    <span>${t('lbl_tags')}</span>
                    <span class="watch-side-details-tags">${tagsMarkup}</span>
                </div>
            </div>
            <button type="button" class="watch-side-details-toggle" data-watch-side-toggle>${watchState.sideDetailsCollapsed ? t('btn_expand') : t('btn_collapse')}</button>
        </section>
    `;

    bindWatchSideDetailsControls();
}

function featuredCard(video) {
    const item = normalizeVideo(video);
    return `
        <div class="featured-item">
            <span class="video-thumb-wrap">
                <a href="${buildWatchUrl(item)}"><img class="featured-thumb" src="${escapeHtml(item.thumbnail)}" alt="${escapeHtml(item.title)}"></a>
            </span>
            <a class="featured-title" href="${buildWatchUrl(item)}" title="${escapeHtml(item.title)}">${escapeHtml(item.title)}</a>
            <span class="featured-meta"><a href="${buildChannelUrl(item.channelId)}">${escapeHtml(item.channelTitle)}</a><br>${escapeHtml(formatDateShort(item.publishedAt))}</span>
        </div>
    `;
}

function denseCard(video) {
    const item = normalizeVideo(video);
    return `
        <div class="dense-item">
            <span class="video-thumb-wrap">
                <a href="${buildWatchUrl(item)}"><img class="dense-thumb" src="${escapeHtml(item.thumbnail)}" alt="${escapeHtml(item.title)}"></a>
            </span>
            <span>
                <a class="dense-title" href="${buildWatchUrl(item)}" title="${escapeHtml(item.title)}">${escapeHtml(item.title)}</a>
                <span class="dense-meta"><a href="${buildChannelUrl(item.channelId)}">${escapeHtml(item.channelTitle)}</a><br>${escapeHtml(formatDateShort(item.publishedAt))}</span>
            </span>
        </div>
    `;
}

function sideVideoCard(video) {
    const item = normalizeVideo(video);
    return `
        <div class="side-video-item">
            <span class="video-thumb-wrap">
                <a href="${buildWatchUrl(item)}"><img class="side-video-thumb" src="${escapeHtml(item.thumbnail)}" alt="${escapeHtml(item.title)}"></a>
            </span>
            <span>
                <a class="side-video-title" href="${buildWatchUrl(item)}" title="${escapeHtml(item.title)}">${escapeHtml(item.title)}</a>
                <span class="side-video-meta"><a href="${buildChannelUrl(item.channelId)}">${escapeHtml(item.channelTitle)}</a><br>${escapeHtml(formatDateShort(item.publishedAt))}</span>
            </span>
        </div>
    `;
}

function watchRecommendationCard(video) {
    const item = normalizeVideo(video);
    return `
        <div class="watch-recommendation-card">
            <a class="watch-recommendation-thumb-link" href="${buildWatchUrl(item)}">
                <span class="video-thumb-wrap">
                    <img class="watch-recommendation-thumb" src="${escapeHtml(item.thumbnail)}" alt="${escapeHtml(item.title)}">
                </span>
            </a>
            <span class="watch-recommendation-copy">
                <a class="watch-recommendation-title" href="${buildWatchUrl(item)}" title="${escapeHtml(item.title)}">${escapeHtml(item.title)}</a>
                <a class="watch-recommendation-channel" href="${buildChannelUrl(item.channelId)}">${escapeHtml(item.channelTitle)}</a>
                <span class="watch-recommendation-date">${escapeHtml(formatDateShort(item.publishedAt))}</span>
            </span>
        </div>
    `;
}

function channelCard(subscription) {
    const thumb = safeImageUrl(subscription.thumbnail || fallbackThumb, fallbackThumb);
    return `
        <a class="channel-item" href="${buildChannelUrl(subscription.channelId)}">
            <img src="${escapeHtml(thumb)}" alt="${escapeHtml(subscription.channelTitle || subscription.channelId)}">
            <span>
                <span class="dense-title">${escapeHtml(subscription.channelTitle || subscription.channelId)}</span>
                <span class="channel-meta">${escapeHtml(subscription.channelId || '')}<br>${escapeHtml(formatDateShort(subscription.lastVideoAt || subscription.addedAt || ''))}</span>
            </span>
        </a>
    `;
}

function sideSubscriptionCard(subscription) {
    const thumb = safeImageUrl(subscription.thumbnail || fallbackThumb, fallbackThumb);
    const title = subscription.channelTitle || subscription.channelId;
    return `
        <a class="side-sub-item" href="${buildChannelUrl(subscription.channelId)}" title="${escapeHtml(title)}">
            <img class="side-sub-thumb" src="${escapeHtml(thumb)}" alt="${escapeHtml(title)}">
            <span>
                <span class="side-video-title">${escapeHtml(title)}</span>
                <span class="side-sub-meta">${escapeHtml(subscription.channelId || '')}</span>
            </span>
        </a>
    `;
}

function searchCard(video) {
    const item = normalizeVideo(video);
    return `
        <div class="search-item">
            <a href="${buildWatchUrl(item)}" class="video-thumb-wrap">
                <img class="search-thumb" src="${escapeHtml(item.thumbnail)}" alt="${escapeHtml(item.title)}">
            </a>
            <div>
                <a href="${buildWatchUrl(item)}" class="search-title">${escapeHtml(item.title)}</a>
                <div class="search-meta"><a href="${buildChannelUrl(item.channelId)}">${escapeHtml(item.channelTitle)}</a> | ${escapeHtml(formatDateShort(item.publishedAt))}</div>
                <div class="search-meta">${escapeHtml((item.description || '').slice(0, 190))}</div>
                <div class="search-actions">
                    <a class="mini-btn" href="${buildWatchUrl(item)}">${t('nav_watch')}</a>
                    <a class="mini-btn" href="${buildChannelUrl(item.channelId)}">${t('lbl_channel')}</a>
                    <a class="mini-btn" href="${escapeHtml(item.videoUrl)}" target="_blank" rel="noopener noreferrer">youtube</a>
                </div>
            </div>
        </div>
    `;
}

function renderUtilitySubscriptions() {
    if (!elements.utilitySubscriptionList) {
        return;
    }

    if (!state.subscriptions.length) {
        elements.utilitySubscriptionList.innerHTML = emptyBlock(t('empty_subs_panel'));
        return;
    }

    elements.utilitySubscriptionList.innerHTML = state.subscriptions.map((subscription) => `
        <div class="utility-sub-item">
            <a href="${buildChannelUrl(subscription.channelId)}">${escapeHtml(subscription.channelTitle || subscription.channelId)}</a>
            <button type="button" data-remove-sub="${escapeHtml(subscription.channelId)}">x</button>
        </div>
    `).join('');

    document.querySelectorAll('[data-remove-sub]').forEach((button) => {
        button.addEventListener('click', async () => {
            await removeSubscription(button.getAttribute('data-remove-sub'));
        });
    });
}

function renderSideSubscriptions() {
    if (!elements.sideSubscriptions) {
        return;
    }

    const pool = state.subscriptions.slice();
    for (let index = pool.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [pool[index], pool[swapIndex]] = [pool[swapIndex], pool[index]];
    }

    elements.sideSubscriptions.innerHTML = state.subscriptions.length
        ? pool.slice(0, 5).map(sideSubscriptionCard).join('')
        : emptyBlock(t('empty_subs'));
}

function renderStats() {
    if (elements.statSubscriptions) {
        elements.statSubscriptions.textContent = String(state.subscriptions.length);
    }
    if (elements.statVideos) {
        elements.statVideos.textContent = String(state.videos.length);
    }
    if (elements.statUpdated) {
        elements.statUpdated.textContent = state.updatedAt ? t('lbl_upd_stat', { date: formatDateShort(state.updatedAt) }) : t('stat_not_updated');
    }
}

function getHomePageFromUrl() {
    const value = Number(new URLSearchParams(window.location.search).get('p') || 1);
    return Number.isFinite(value) && value > 0 ? Math.floor(value) : 1;
}

function syncHomePageUrl(pageNumber) {
    const url = new URL(window.location.href);
    if (pageNumber > 1) {
        url.searchParams.set('p', String(pageNumber));
    } else {
        url.searchParams.delete('p');
    }
    window.history.replaceState({}, '', url.toString());
}

function getSearchPageFromUrl() {
    const value = Number(new URLSearchParams(window.location.search).get('p') || 1);
    return Number.isFinite(value) && value > 0 ? Math.floor(value) : 1;
}

function syncSearchPageUrl(pageNumber) {
    if (page !== 'search') {
        return;
    }

    const url = new URL(window.location.href);
    if (pageNumber > 1) {
        url.searchParams.set('p', String(pageNumber));
    } else {
        url.searchParams.delete('p');
    }
    window.history.replaceState({}, '', url.toString());
}

function buildPaginationButtons(currentPage, totalPages, dataAttr) {
    const range = [];
    const rangeWithDots = [];
    let l;

    if (totalPages <= 1) return '';

    // Always show first 5 pages
    for (let i = 1; i <= Math.min(5, totalPages); i++) {
        range.push(i);
    }

    // Show pages around current if not already included
    const delta = 2;
    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
        if (i > 5 && i < totalPages - 4) {
            range.push(i);
        }
    }

    // Always show last 5 pages
    for (let i = Math.max(6, totalPages - 4); i <= totalPages; i++) {
        range.push(i);
    }

    // Remove duplicates and sort
    const uniqueRange = [...new Set(range)].sort((a, b) => a - b);

    for (let i of uniqueRange) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
                rangeWithDots.push('...');
            }
        }
        rangeWithDots.push(i);
        l = i;
    }

    return rangeWithDots.map(i => {
        if (i === '...') {
            return `<span class="home-page-dots">...</span>`;
        }
        const activeClass = i === currentPage ? ' is-active' : '';
        return `<button type="button" class="home-page-btn${activeClass}" ${dataAttr}="${i}">${i}</button>`;
    }).join('');
}

function renderHomePage() {
    const videos = state.videos.slice();

    if (elements.homeFeatured) {
        elements.homeFeatured.innerHTML = state.videos.length
            ? state.videos.slice(0, 3).map(featuredCard).join('')
            : emptyBlock(t('empty_feed'));
    }

    const latestPool = videos.slice(3);
    const topRowsCount = 9;
    const bottomRowsCount = 12;
    const perPage = topRowsCount + bottomRowsCount;
    const pages = Math.max(1, Math.ceil(latestPool.length / perPage));
    const currentPage = Math.max(1, Math.min(homeState.latestPage, pages));
    const pageStart = (currentPage - 1) * perPage;
    const pageItems = latestPool.slice(pageStart, pageStart + perPage);
    const topItems = pageItems.slice(0, topRowsCount);
    const bottomItems = pageItems.slice(topRowsCount, perPage);
    homeState.latestPage = currentPage;

    if (elements.homeLatest) {
        elements.homeLatest.innerHTML = topItems.length
            ? topItems.map(denseCard).join('')
            : emptyBlock(t('empty_new'));
    }

    if (elements.homeLatestExtra) {
        elements.homeLatestExtra.innerHTML = bottomItems.length
            ? bottomItems.map(denseCard).join('')
            : emptyBlock(t('empty_extra'));
    }

    if (elements.homeLatestHead) {
        const latestSection = elements.homeLatestHead.closest('.module-box');
        if (latestSection) {
            latestSection.classList.toggle('hide-head', currentPage > 1);
        } else {
            elements.homeLatestHead.hidden = currentPage > 1;
        }
    }

    if (elements.homePagination) {
        if (pages <= 1) {
            elements.homePagination.innerHTML = '';
        } else {
            const pageButtons = buildPaginationButtons(currentPage, pages, 'data-home-page');
            const prevDisabled = currentPage <= 1 ? ' disabled' : '';
            const nextDisabled = currentPage >= pages ? ' disabled' : '';
            elements.homePagination.innerHTML = `
                <button type="button" class="home-page-btn home-page-nav" data-home-page="${currentPage - 1}"${prevDisabled}>‹</button>
                ${pageButtons}
                <button type="button" class="home-page-btn home-page-nav" data-home-page="${currentPage + 1}"${nextDisabled}>›</button>
            `;
        }
    }
    syncHomePageUrl(currentPage);

    const current = normalizeVideo(videos[0] || {});

    if (elements.sideFeatured) {
        elements.sideFeatured.innerHTML = current.id
            ?                 `
                <div>
                    <a href="${buildWatchUrl(current)}"><img src="${escapeHtml(current.thumbnail)}" alt="${escapeHtml(current.title)}"></a>
                    <a class="featured-title" href="${buildWatchUrl(current)}">${escapeHtml(current.title)}</a>
                    <div class="featured-meta"><a href="${buildChannelUrl(current.channelId)}">${escapeHtml(current.channelTitle)}</a><br>${escapeHtml(formatDateShort(current.publishedAt))}</div>
                </div>
            `
            : emptyBlock(t('empty_watch'));
    }

    if (elements.sideWatchLink) {
        elements.sideWatchLink.href = current.id ? buildWatchUrl(current) : 'watch.html';
    }

    if (elements.sideLatest) {
        const sidePool = state.videos.slice();
        for (let index = sidePool.length - 1; index > 0; index -= 1) {
            const swapIndex = Math.floor(Math.random() * (index + 1));
            [sidePool[index], sidePool[swapIndex]] = [sidePool[swapIndex], sidePool[index]];
        }
        elements.sideLatest.innerHTML = videos.length
            ? sidePool.slice(0, 5).map(sideVideoCard).join('')
            : emptyBlock(t('empty_side'));
    }
}

function localSearch(query) {
    const q = query.trim().toLowerCase();
    if (!q) {
        return [];
    }

    return state.videos.filter((video) => {
        return `${video.title} ${video.channelTitle} ${video.description}`.toLowerCase().includes(q);
    });
}

async function runSearch(query, mode = state.searchMode) {
    if (!query.trim()) {
        return [];
    }

    if (mode === 'global' && state.searchEnabled) {
        const payload = await requestJson(`/api/video/search?q=${encodeURIComponent(query)}`);
        return filterSupportedVideos(payload.items || []);
    }

    return localSearch(query).map(normalizeVideo);
}

function resetSearchPagination() {
    searchState.currentPage = 1;
    searchState.totalItems = 0;
}

function applySearchPagination() {
    if (!elements.searchPageResults) {
        return;
    }

    const items = Array.from(elements.searchPageResults.querySelectorAll('.search-item'));
    searchState.totalItems = items.length;
    const totalPages = Math.max(1, Math.ceil(searchState.totalItems / searchState.perPage));

    if (!items.length) {
        if (elements.searchPagination) {
            elements.searchPagination.innerHTML = '';
        }
        return;
    }

    searchState.currentPage = Math.max(1, Math.min(searchState.currentPage, totalPages));
    const start = (searchState.currentPage - 1) * searchState.perPage;
    const end = start + searchState.perPage;
    items.forEach((item, index) => {
        item.classList.toggle('is-hidden', index < start || index >= end);
    });

    if (elements.searchPagination) {
        if (totalPages <= 1) {
            elements.searchPagination.innerHTML = '';
        } else {
            const pageButtons = buildPaginationButtons(searchState.currentPage, totalPages, 'data-search-page');
            const prevDisabled = searchState.currentPage <= 1 ? ' disabled' : '';
            const nextDisabled = searchState.currentPage >= totalPages ? ' disabled' : '';
            elements.searchPagination.innerHTML = `
                <button type="button" class="home-page-btn home-page-nav" data-search-page="${searchState.currentPage - 1}"${prevDisabled}>‹</button>
                ${pageButtons}
                <button type="button" class="home-page-btn home-page-nav" data-search-page="${searchState.currentPage + 1}"${nextDisabled}>›</button>
            `;
        }
    }
}

function goToSearchPage(pageNumber) {
    const page = Number(pageNumber) || 1;
    searchState.currentPage = Math.max(1, page);
    applySearchPagination();
    syncSearchPageUrl(searchState.currentPage);
    if (elements.searchPageResults) {
        elements.searchPageResults.scrollIntoView({ behavior: 'auto', block: 'start' });
    }
}

async function renderSearchPage() {
    const pageParams = new URLSearchParams(window.location.search);
    const query = pageParams.get('q') || '';
    const pageFromUrl = getSearchPageFromUrl();
    const requestedMode = pageParams.get('mode') || state.searchMode || window.localStorage.getItem('tuuday-video-search-mode') || 'subscriptions';
    state.searchMode = normalizeSearchMode(requestedMode);

    if (elements.mastSearchInput) {
        elements.mastSearchInput.value = query;
    }

    renderSearchModeBar();
    document.title = query.trim()
        ? `${query} - \u043f\u043e\u0438\u0441\u043a - Videoalta`
        : '\u041f\u043e\u0438\u0441\u043a - Videoalta';

    if (!elements.searchPageResults) {
        return;
    }

    if (!query.trim()) {
        elements.searchPageStatus.textContent = '\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0437\u0430\u043f\u0440\u043e\u0441';
        elements.searchPageResults.innerHTML = emptyBlock('\u0421\u0442\u0440\u0430\u043d\u0438\u0446\u0430 \u043f\u043e\u0438\u0441\u043a\u0430 \u0436\u0434\u0451\u0442 \u0437\u0430\u043f\u0440\u043e\u0441.');
        resetSearchPagination();
        if (elements.searchPagination) {
            elements.searchPagination.innerHTML = '';
        }
        syncSearchPageUrl(1);
    } else {
        elements.searchPageStatus.textContent = state.searchMode === 'global'
            ? '\u0418\u0434\u0451\u0442 \u0433\u043b\u043e\u0431\u0430\u043b\u044c\u043d\u044b\u0439 \u043f\u043e\u0438\u0441\u043a...'
            : '\u0418\u0449\u0435\u043c \u043f\u043e \u043f\u043e\u0434\u043f\u0438\u0441\u043a\u0430\u043c...';
        const results = await runSearch(query, state.searchMode);
        elements.searchPageStatus.textContent = `\u041d\u0430\u0439\u0434\u0435\u043d\u043e: ${results.length}`;
        elements.searchPageResults.innerHTML = results.length
            ? results.map(searchCard).join('')
            : emptyBlock(state.searchMode === 'global'
                ? '\u041f\u043e \u044d\u0442\u043e\u043c\u0443 \u0437\u0430\u043f\u0440\u043e\u0441\u0443 \u043d\u0438\u0447\u0435\u0433\u043e \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e.'
                : '\u041f\u043e \u043f\u043e\u0434\u043f\u0438\u0441\u043a\u0430\u043c \u043d\u0438\u0447\u0435\u0433\u043e \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0433\u043b\u043e\u0431\u0430\u043b\u044c\u043d\u044b\u0439 \u043f\u043e\u0438\u0441\u043a.');
        resetSearchPagination();
        searchState.currentPage = pageFromUrl;
        applySearchPagination();
        syncSearchPageUrl(searchState.currentPage);
    }

    if (elements.searchSideLatest) {
        elements.searchSideLatest.innerHTML = state.videos.length
            ? state.videos.slice(0, 10).map(sideVideoCard).join('')
            : emptyBlock('\u0412\u0430\u0448\u0430 \u043b\u0435\u043d\u0442\u0430 \u043f\u043e\u043a\u0430 \u043f\u0443\u0441\u0442\u0430.');
    }
}

function renderSubscriptionsPage() {
    document.title = 'Каналы - Videoalta';

    if (elements.subscriptionsPageStatus) {
        elements.subscriptionsPageStatus.textContent = t('lbl_channels_stat', { count: state.subscriptions.length });
    }

    if (elements.subscriptionsPageList) {
        elements.subscriptionsPageList.innerHTML = state.subscriptions.length
            ? state.subscriptions.map(channelCard).join('')
            : emptyBlock(t('empty_subs'));
    }

    if (elements.subscriptionsSideLatest) {
        elements.subscriptionsSideLatest.innerHTML = state.videos.length
            ? state.videos.slice(0, 10).map(sideVideoCard).join('')
            : emptyBlock(t('empty_feed'));
    }
}

function buildWatchFallbackVideo(rawValue, videoId) {
    return normalizeVideo({
        id: videoId,
        channelId: params.get('channelId') || '',
        title: params.get('title') || 'Видео',
        channelTitle: params.get('channel') || 'YouTube',
        publishedAt: params.get('date') || '',
        thumbnail: params.get('thumb') || fallbackThumb,
        description: params.get('description') || '',
        videoUrl: videoId ? `https://www.youtube.com/watch?v=${videoId}` : rawValue || '#'
    });
}

function normalizeComment(comment) {
    return {
        id: comment.id || '',
        authorDisplayName: comment.authorDisplayName || 'YouTube',
        authorProfileImageUrl: safeImageUrl(comment.authorProfileImageUrl || fallbackAvatar, fallbackAvatar),
        authorChannelId: comment.authorChannelId || '',
        authorChannelUrl: comment.authorChannelUrl || '',
        text: comment.text || '',
        publishedAt: comment.publishedAt || '',
        updatedAt: comment.updatedAt || '',
        likeCount: Number(comment.likeCount || 0),
        replyCount: Number(comment.replyCount || 0)
    };
}

function commentCard(comment) {
    const headMeta = comment.publishedAt ? escapeHtml(formatDateShort(comment.publishedAt)) : '';
    const footParts = [
        comment.likeCount ? `${escapeHtml(formatCount(comment.likeCount))} ${t('lbl_likes')}` : '',
        comment.replyCount ? `${escapeHtml(formatCount(comment.replyCount))} ${t('lbl_replies')}` : ''
    ].filter(Boolean);
    const authorHref = comment.authorChannelId
        ? buildChannelUrl(comment.authorChannelId)
        : comment.authorChannelUrl || '';
    const authorTarget = comment.authorChannelId ? '' : ' target="_blank" rel="noopener noreferrer"';
    const author = authorHref
        ? `<a class="watch-comment-author" href="${escapeHtml(authorHref)}"${authorTarget}>${escapeHtml(comment.authorDisplayName)}</a>`
        : `<span class="watch-comment-author">${escapeHtml(comment.authorDisplayName)}</span>`;

    return `
        <article class="watch-comment">
            <img class="watch-comment-avatar" src="${escapeHtml(comment.authorProfileImageUrl)}" alt="${escapeHtml(comment.authorDisplayName)}">
            <div>
                <div class="watch-comment-head">${author}${headMeta ? ` <span class="watch-comment-meta">| ${headMeta}</span>` : ''}</div>
                <div class="watch-comment-body">${formatCommentHtml(comment.text)}</div>
                ${footParts.length ? `<div class="watch-comment-foot">${footParts.join(' | ')}</div>` : ''}
            </div>
        </article>
    `;
}

function renderWatchComments(emptyMessage = t('lbl_comments_empty')) {
    if (!elements.watchComments) {
        return;
    }

    elements.watchComments.innerHTML = watchState.comments.length
        ? watchState.comments.map(commentCard).join('')
        : emptyBlock(watchState.commentsError || emptyMessage);

    if (elements.watchCommentsNote) {
        if (watchState.commentsError) {
            elements.watchCommentsNote.textContent = t('lbl_comments_unavail');
        } else if (watchState.comments.length) {
            const total = watchState.commentsTotalResults || watchState.comments.length;
            elements.watchCommentsNote.textContent = `${formatCount(total) || total} ${t('lbl_comments')}`;
        } else {
            elements.watchCommentsNote.textContent = emptyMessage;
        }
    }

    if (elements.watchCommentsMore) {
        elements.watchCommentsMore.hidden = !watchState.commentsNextPageToken || Boolean(watchState.commentsError);
    }

    bindWatchTimestampLinks(elements.watchComments);
}

async function loadWatchComments(pageToken = '') {
    const videoId = watchState.current && watchState.current.id;

    if (!videoId) {
        watchState.comments = [];
        watchState.commentsNextPageToken = '';
        watchState.commentsTotalResults = 0;
        watchState.commentsError = '';
        return;
    }

    const suffix = pageToken ? `&pageToken=${encodeURIComponent(pageToken)}` : '';
    const payload = await requestJson(`/api/video/comments?id=${encodeURIComponent(videoId)}${suffix}`);
    const items = (payload.items || []).map(normalizeComment);

    if (videoId !== (watchState.current && watchState.current.id)) {
        return;
    }

    watchState.comments = pageToken
        ? watchState.comments.concat(items)
        : items;
    watchState.commentsNextPageToken = payload.nextPageToken || '';
    watchState.commentsTotalResults = Number(payload.totalResults || 0);
    watchState.commentsError = '';
}

function shouldHydrateWatchVideo(video) {
    return Boolean(
        video &&
        video.id &&
        (
            !video.channelId ||
            !video.description ||
            !video.publishedAt ||
            video.channelTitle === 'YouTube' ||
            video.title === 'Видео' ||
            video.title === 'Без названия'
        )
    );
}

async function resolveWatchVideo() {
    const rawValue = params.get('v') || '';
    const videoId = extractYoutubeVideoId(rawValue);
    const existing = videoId ? state.videos.find((video) => video.id === videoId) : null;

    if (existing) {
        return normalizeVideo(existing);
    }

    if (!videoId) {
        return normalizeVideo(state.videos[0] || {});
    }

    const fallbackVideo = buildWatchFallbackVideo(rawValue, videoId);

    if (!shouldHydrateWatchVideo(fallbackVideo)) {
        return fallbackVideo;
    }

    try {
        const payload = await requestJson(`/api/video/video?value=${encodeURIComponent(rawValue || videoId)}`);
        return normalizeVideo({
            ...fallbackVideo,
            ...(payload.video || {}),
            id: videoId
        });
    } catch (error) {
        showToast(t('msg_no_author'), 3200);
        return fallbackVideo;
    }
}

async function renderWatchPage() {
    const current = await resolveWatchVideo();
    const startSeconds = Number(params.get('t') || 0) || 0;
    watchState.current = current;
    watchState.comments = [];
    watchState.commentsNextPageToken = '';
    watchState.commentsTotalResults = 0;
    watchState.commentsError = '';

    if (elements.watchTitle) {
        elements.watchTitle.textContent = current.title || t('lbl_watch_video');
    }
    document.title = `${current.title || t('lbl_watch_video')} - Videoalta`;

    if (elements.watchYoutubeLink) {
        elements.watchYoutubeLink.href = current.videoUrl || '#';
    }
    if (elements.watchChannelLink) {
        elements.watchChannelLink.href = current.channelId ? buildChannelUrl(current.channelId) : '#';
        elements.watchChannelLink.textContent = current.channelTitle || t('lbl_channel');
    }
    if (elements.watchMetaLine) {
        elements.watchMetaLine.innerHTML = '';
        elements.watchMetaLine.hidden = true;
    }
    if (elements.watchDescription) {
        elements.watchDescription.innerHTML = formatDescriptionHtml(current.description || t('lbl_no_desc'));
        bindWatchDescription();
    }
    renderWatchSideDetails();
    renderWatchComments(current.id ? t('lbl_comments_loading') : t('lbl_comments_unavail'));

    if (current.id) {
        if (elements.watchPlayerFrame && !watchState.player) {
            elements.watchPlayerFrame.src = buildEmbedUrl(current.id, startSeconds);
        }
        await ensureWatchPlayer(current.id, startSeconds);
    } else if (elements.watchPlayerFrame) {
        elements.watchPlayerFrame.src = '';
    }
    syncWatchControls();

    if (elements.watchRecommendations) {
        const list = state.videos.filter((video) => video.id !== current.id).slice(0, 12);
        elements.watchRecommendations.innerHTML = list.length
            ? list.map(watchRecommendationCard).join('')
            : emptyBlock(t('empty_recommendations'));
    }

    const channelVideosPromise = current.channelId
        ? loadWatchChannelVideos(current.channelId, current.id)
        : Promise.resolve([]);
    const commentsPromise = current.id
        ? loadWatchComments().catch((error) => {
            watchState.comments = [];
            watchState.commentsNextPageToken = '';
            watchState.commentsTotalResults = 0;
            watchState.commentsError = error.message;
        })
        : Promise.resolve();

    const [channelVideos] = await Promise.all([channelVideosPromise, commentsPromise]);

    watchState.channelVideos = channelVideos;
    renderWatchComments();
    renderWatchChannelVideos(watchState.channelVideos);
    updateWatchTheaterMetrics();
}

async function loadChannelPageData(pageToken = '') {
    const channelId = params.get('id') || '';

    if (!channelId) {
        throw new Error(t('msg_no_channel_id'));
    }

    channelState.channelId = channelId;
    const suffix = pageToken ? `&pageToken=${encodeURIComponent(pageToken)}` : '';
    const payload = await requestJson(`/api/video/channel?id=${encodeURIComponent(channelId)}${suffix}`);
    channelState.channel = payload.channel || null;
    channelState.nextPageToken = payload.nextPageToken || '';
    channelState.videos = pageToken
        ? channelState.videos.concat(filterSupportedVideos(payload.videos || []))
        : filterSupportedVideos(payload.videos || []);
}

function renderChannelHero() {
    if (!elements.channelHero) {
        return;
    }

    const channel = channelState.channel;

    if (!channel) {
        elements.channelHero.innerHTML = emptyBlock(t('empty_channel'));
        return;
    }

    const safeBanner = safeImageUrl(channel.banner, '');
    const bannerStyle = safeBanner ? ` style="background-image:url('${escapeHtml(safeBanner)}')"` : '';
    const statParts = [
        channel.subscriberCount ? `${escapeHtml(formatCount(channel.subscriberCount))} ${t('lbl_subscribers')}` : '',
        channel.videoCount ? `${escapeHtml(formatCount(channel.videoCount))} ${t('lbl_videos')}` : '',
        channel.viewCount ? `${escapeHtml(formatCount(channel.viewCount))} ${t('lbl_views')}` : ''
    ].filter(Boolean);

    elements.channelHero.innerHTML = `
        <div class="channel-banner"${bannerStyle}></div>
        <div class="channel-hero-body">
            <img class="channel-hero-thumb" src="${escapeHtml(safeImageUrl(channel.thumbnail || fallbackThumb, fallbackThumb))}" alt="${escapeHtml(channel.title || channel.channelId)}">
            <div class="channel-hero-copy">
                <div class="channel-hero-title-row">
                    <h1>${escapeHtml(channel.title || channel.channelId)}</h1>
                    <a class="mini-btn" href="https://www.youtube.com/channel/${escapeHtml(channel.channelId)}" target="_blank" rel="noopener noreferrer">youtube</a>
                </div>
                <div class="channel-hero-meta">${escapeHtml(channel.channelId)}${channel.customUrl ? ` | ${escapeHtml(channel.customUrl)}` : ''}</div>
                <div class="channel-hero-meta">${statParts.join(' | ') || t('lbl_no_stat')}</div>
                <div class="channel-hero-description">${escapeHtml((channel.description || '').slice(0, 600) || t('lbl_no_channel_desc'))}</div>
            </div>
        </div>
    `;
}

function renderChannelPage() {
    renderChannelHero();
    const channelTitle = (channelState.channel && (channelState.channel.title || channelState.channel.channelId)) || t('lbl_channel');
    document.title = `${channelTitle} - Videoalta`;


    if (elements.channelVideoNote) {
        elements.channelVideoNote.textContent = channelState.videos.length
            ? t('lbl_videos_on_page', { count: channelState.videos.length })
            : t('lbl_no_videos');
    }

    if (elements.channelVideoList) {
        elements.channelVideoList.innerHTML = channelState.videos.length
            ? channelState.videos.map(searchCard).join('')
            : emptyBlock(t('empty_channel_videos'));
    }

    if (elements.channelLoadMore) {
        elements.channelLoadMore.hidden = !channelState.nextPageToken;
    }

    if (elements.channelSideLatest) {
        elements.channelSideLatest.innerHTML = state.videos.length
            ? state.videos.slice(0, 10).map(sideVideoCard).join('')
            : emptyBlock(t('empty_feed'));
    }
}

function applyState(nextState) {
    state.subscriptions = nextState.subscriptions || [];
    state.videos = filterSupportedVideos(nextState.videos || []);
    state.updatedAt = nextState.updatedAt || null;
    state.searchEnabled = Boolean(nextState.search && nextState.search.enabled);
    state.searchMode = normalizeSearchMode(params.get('mode') || state.searchMode || window.localStorage.getItem('tuuday-video-search-mode') || 'subscriptions');

    renderUtilitySubscriptions();
    renderSideSubscriptions();
    renderStats();
    renderSearchModeBar();
}

async function loadState() {
    applyState(await requestJson('/api/video/state'));
}

async function rerenderCurrentPage() {
    if (page === 'home') {
        renderHomePage();
    }
    if (page === 'search') {
        await renderSearchPage();
    }
    if (page === 'subscriptions') {
        renderSubscriptionsPage();
    }
    if (page === 'watch') {
        await renderWatchPage();
    }
    if (page === 'channel') {
        channelState.videos = [];
        await loadChannelPageData('');
        renderChannelPage();
    }
}

async function refreshState() {
    if (elements.quickRefreshBtn) {
        elements.quickRefreshBtn.disabled = true;
        elements.quickRefreshBtn.classList.add('is-loading');
        elements.quickRefreshBtn.textContent = t('btn_refresh_start');
    }

    try {
        const payload = await requestJson('/api/video/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: '{}'
        });

        if (payload.status === 'already_running' || payload.status === 'started') {
            // Poll for progress
            const pollInterval = setInterval(async () => {
                try {
                    const status = await requestJson('/api/video/refresh/status');
                    if (status.isRefreshing) {
                        if (elements.quickRefreshBtn) {
                            elements.quickRefreshBtn.textContent = t('btn_refresh_upd', { current: status.progress.current, total: status.progress.total });
                        }
                    } else {
                        clearInterval(pollInterval);
                        
                        // Done refreshing, reload final state
                        const finalState = await requestJson('/api/video/state');
                        applyState(finalState);
                        
                        if (elements.quickRefreshBtn) {
                            elements.quickRefreshBtn.disabled = false;
                            elements.quickRefreshBtn.classList.remove('is-loading');
                            elements.quickRefreshBtn.textContent = t('btn_refresh');
                        }
                        
                        showToast(status.errors && status.errors.length ? t('msg_refresh_errors', { count: status.errors.length }) : t('msg_feed_updated'));
                        await rerenderCurrentPage();
                    }
                } catch (err) {
                    clearInterval(pollInterval);
                    throw err;
                }
            }, 2000);
            return; // Exit here, polling handles the rest
        }
    } catch (err) {
        if (elements.quickRefreshBtn) {
            elements.quickRefreshBtn.disabled = false;
            elements.quickRefreshBtn.classList.remove('is-loading');
            elements.quickRefreshBtn.textContent = t('btn_refresh');
        }
        throw err;
    }
}

async function addSubscription(value) {
    const payload = await requestJson('/api/video/subscriptions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value })
    });

    applyState(payload.state);
    showToast(payload.duplicate ? t('msg_sub_exists') : t('msg_sub_added'));
    await rerenderCurrentPage();
}

async function importSubscriptions(text) {
    const payload = await requestJson('/api/video/import', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
    });

    applyState(payload.state);
    const addedCount = payload.added ? payload.added.length : 0;
    const skippedCount = payload.skipped ? payload.skipped.length : 0;
    const errorCount = payload.errors ? payload.errors.length : 0;
    showToast(t('msg_import_res', { added: addedCount, skipped: skippedCount, errors: errorCount }), 4200);
    await rerenderCurrentPage();
}

async function exportSubscriptionsJson() {
    const payload = await requestJson('/api/video/subscriptions/export', {
        method: 'GET'
    });

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    const date = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.download = `subscriptions-${date}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
    showToast('Export JSON downloaded.', 2600);
}

async function removeSubscription(channelId) {
    const payload = await requestJson(`/api/video/subscriptions/${encodeURIComponent(channelId)}`, {
        method: 'DELETE'
    });

    applyState(payload.state);
    showToast(t('msg_sub_removed'));
    await rerenderCurrentPage();
}

function initUtilityPanel() {
    if (elements.utilityToggle && elements.utilityPanel) {
        elements.utilityToggle.addEventListener('click', () => {
            elements.utilityPanel.hidden = !elements.utilityPanel.hidden;
        });

        document.addEventListener('click', (event) => {
            if (elements.utilityPanel.hidden) {
                return;
            }

            const clickedInside = elements.utilityPanel.contains(event.target) || elements.utilityToggle.contains(event.target);
            if (!clickedInside) {
                elements.utilityPanel.hidden = true;
            }
        });
    }

    if (elements.quickAddForm) {
        elements.quickAddForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const value = (elements.quickAddInput.value || '').trim();

            if (!value) {
                elements.quickAddInput.focus();
                return;
            }

            try {
                await addSubscription(value);
                elements.quickAddInput.value = '';
            } catch (error) {
                showToast(error.message, 3800);
            }
        });
    }

    if (elements.quickImportBtn) {
        elements.quickImportBtn.addEventListener('click', async () => {
            const text = (elements.quickImportInput.value || '').trim();

            if (!text) {
                elements.quickImportInput.focus();
                return;
            }

            try {
                await importSubscriptions(text);
                elements.quickImportInput.value = '';
            } catch (error) {
                showToast(error.message, 3800);
            }
        });
    }

    if (elements.quickExportBtn) {
        elements.quickExportBtn.addEventListener('click', async () => {
            try {
                await exportSubscriptionsJson();
            } catch (error) {
                showToast(error.message, 3800);
            }
        });
    }

    if (elements.quickRefreshBtn) {
        elements.quickRefreshBtn.addEventListener('click', async () => {
            try {
                await refreshState();
            } catch (error) {
                showToast(error.message, 3800);
            }
        });
    }
}

function initChannelPageControls() {
    if (elements.channelLoadMore) {
        elements.channelLoadMore.addEventListener('click', async () => {
            if (!channelState.nextPageToken) {
                return;
            }

            try {
                elements.channelLoadMore.disabled = true;
                elements.channelLoadMore.textContent = t('btn_loading');
                await loadChannelPageData(channelState.nextPageToken);
                renderChannelPage();
            } catch (error) {
                showToast(error.message, 4200);
            } finally {
                elements.channelLoadMore.disabled = false;
                elements.channelLoadMore.textContent = t('btn_more_videos');
            }
        });
    }
}

function initWatchPageControls() {
    if (elements.watchCommentsMore) {
        elements.watchCommentsMore.addEventListener('click', async () => {
            if (!watchState.commentsNextPageToken) {
                return;
            }

            try {
                elements.watchCommentsMore.disabled = true;
                elements.watchCommentsMore.textContent = t('btn_loading');
                await loadWatchComments(watchState.commentsNextPageToken);
                renderWatchComments();
            } catch (error) {
                showToast(error.message, 3800);
            } finally {
                elements.watchCommentsMore.disabled = false;
                elements.watchCommentsMore.textContent = t('btn_more_comments');
            }
        });
    }
}

function initSearchPageControls() {
    if (!elements.searchPagination) {
        return;
    }

    elements.searchPagination.addEventListener('click', (event) => {
        const button = event.target.closest('[data-search-page]');
        if (!button || button.hasAttribute('disabled')) {
            return;
        }

        goToSearchPage(button.getAttribute('data-search-page'));
    });
}

async function initPage() {
    initTheme();
    applyI18nToDOM();
    initUtilityPanel();
    initChannelPageControls();
    initWatchPageControls();
    initSearchPageControls();
    if (elements.searchModeBar) {
        elements.searchModeBar.addEventListener('click', (event) => {
            const button = event.target.closest('[data-search-mode]');
            if (!button) {
                return;
            }
            applySearchMode(button.getAttribute('data-search-mode'), true);
        });
    }
    if (elements.homePagination) {
        elements.homePagination.addEventListener('click', (event) => {
            const button = event.target.closest('[data-home-page]');
            if (!button) {
                return;
            }
            if (button.hasAttribute('disabled')) {
                return;
            }
            homeState.latestPage = Number(button.getAttribute('data-home-page')) || 1;
            renderHomePage();
        });
    }
    if (page === 'watch') {
        initWatchPlayerControls();
        document.addEventListener('keydown', handleWatchKeyboardShortcuts);
    }
    await loadState();

    if (page === 'home') {
        homeState.latestPage = getHomePageFromUrl();
        renderHomePage();
    }
    if (page === 'search') {
        await renderSearchPage();
    }
    if (page === 'subscriptions') {
        renderSubscriptionsPage();
    }
    if (page === 'watch') {
        await renderWatchPage();
    }
    if (page === 'channel') {
        await loadChannelPageData('');
        renderChannelPage();
    }
}

initPage().catch((error) => {
    showToast(error.message, 4200);
});

