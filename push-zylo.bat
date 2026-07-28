@echo off
setlocal
cd /d "%~dp0"

echo ============================================
echo   Zylo Site - Push to GitHub
echo ============================================
echo.

git rev-parse --is-inside-work-tree >nul 2>nul
if errorlevel 1 (
    echo [ERROR] This folder is not a git repository.
    echo Make sure this .bat file is inside your zylo-site folder.
    echo.
    pause
    exit /b 1
)

echo Checking for changes...
git add .

git diff --cached --quiet
if not errorlevel 1 (
    echo.
    echo No changes to commit. Nothing to push.
    echo.
    pause
    exit /b 0
)

echo.
set /p COMMIT_MSG=Enter a short description of what changed: 

if "%COMMIT_MSG%"=="" (
    echo.
    echo [ERROR] Commit message cannot be empty. Please try again.
    echo.
    pause
    exit /b 1
)

echo.
echo Committing...
git commit -m "%COMMIT_MSG%"
if errorlevel 1 (
    echo.
    echo [ERROR] Commit failed. See the message above.
    pause
    exit /b 1
)

echo.
echo Pushing to GitHub...
git push
if errorlevel 1 (
    echo.
    echo [ERROR] Push failed. See the message above.
    echo You may need to log in again, or check your internet connection.
    pause
    exit /b 1
)

echo.
echo ============================================
echo   Done! Check the Actions tab on GitHub to
echo   watch the deploy, then refresh your site.
echo ============================================
echo.
pause
