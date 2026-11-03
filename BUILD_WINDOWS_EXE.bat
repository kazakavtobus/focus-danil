@echo off
chcp 65001 >nul
cd /d "%~dp0"
where npm >nul 2>nul
if errorlevel 1 (
 echo Node.js not found. Install Node.js LTS from https://nodejs.org/
 pause
 exit /b 1
)
echo FOCUS Windows Installer -- build with GitHub updates.
if not defined GITHUB_REPOSITORY (
 set /p GITHUB_REPOSITORY=GitHub repository (USERNAME/FOCUS): 
)
if not defined GITHUB_REPOSITORY (
 echo Repository is required for the update feed.
 pause
 exit /b 1
)
call node scripts/configure-github.mjs "%GITHUB_REPOSITORY%"
if errorlevel 1 (pause & exit /b 1)
call npm install --no-fund --no-audit
if errorlevel 1 (pause & exit /b 1)
call npm run build:win
if errorlevel 1 (pause & exit /b 1)
echo.
echo Windows installer is in the release folder.
pause
