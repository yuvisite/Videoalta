@echo off
setlocal

cd /d "%~dp0"

REM Optional: set your key here locally (do not commit real key values)
REM set "YOUTUBE_API_KEY=PASTE_YOUR_KEY_HERE"

where node >nul 2>nul
if errorlevel 1 (
    echo Node.js not found in PATH.
    echo Install Node.js and try again.
    pause
    exit /b 1
)

start "" http://127.0.0.1:8787/video/
node video-server.js

endlocal
