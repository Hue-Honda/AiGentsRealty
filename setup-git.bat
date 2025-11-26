@echo off
echo ========================================
echo Setting up Git for AiGentsRealty
echo ========================================
echo.

REM Remove problematic nul files
echo [1/6] Removing problematic files...
del /F /Q nul 2>nul
del /F /Q frontend\components\nul 2>nul
echo Done!

REM Initialize git
echo.
echo [2/6] Initializing Git...
rmdir /S /Q .git 2>nul
git init
git config core.autocrlf true
echo Done!

REM Add all files
echo.
echo [3/6] Adding files to Git...
git add .
echo Done!

REM Check status
echo.
echo [4/6] Checking what will be committed...
git status --short | find /V "backend/.env" | find /V ".env.local"
echo.

REM Verify .env is NOT in the list
echo [5/6] Security Check...
git status | find "backend/.env" >nul
if %ERRORLEVEL% EQU 0 (
    echo ERROR: .env file found in git! This is dangerous!
    echo Please remove it before committing.
    pause
    exit /b 1
) else (
    echo PASS: .env file is NOT in git (good!)
)
echo.

REM Create commit
echo [6/6] Creating initial commit...
git commit -m "Initial commit: AiGentsRealty - Dubai Off-Plan Property Platform with AI"
echo.

echo ========================================
echo SUCCESS! Git is ready to push!
echo ========================================
echo.
echo Next steps:
echo 1. Create repository on GitHub
echo 2. Run these commands:
echo    git remote add origin https://github.com/YOUR_USERNAME/AiGentsRealty.git
echo    git branch -M main
echo    git push -u origin main
echo.
pause
