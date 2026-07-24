@echo off
title Zylo Setup Site
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
    echo Node.js is not installed or not in PATH.
    echo Please install it from https://nodejs.org and try again.
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo Installing dependencies for the first time, this may take a minute...
    call npm install
    if errorlevel 1 (
        echo.
        echo npm install failed. See the errors above.
        pause
        exit /b 1
    )
)

echo Starting Zylo Setup site...
echo Press Ctrl+C in this window to stop the server.
call npm run dev

pause
