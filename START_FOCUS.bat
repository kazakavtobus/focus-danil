@echo off
chcp 65001 >nul
cd /d "%~dp0"
where npm >nul 2>nul
if errorlevel 1 (
 echo Node.js not found. Install Node.js LTS from https://nodejs.org/
 pause
 exit /b 1
)
if not exist "node_modules\electron-updater" (
 echo Installing dependencies (first run only)...
 call npm install
 if errorlevel 1 (pause & exit /b 1)
)
call npm start
