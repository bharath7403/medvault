@echo off
title Push MedVault to GitHub
color 0B
echo ========================================================
echo        Pushing MedVault to github.com/bharath7403/medvault
echo ========================================================
echo.
cd /d D:\BHARATH\PROJECTS\medvault
mingit\cmd\git.exe push -u origin main
echo.
if %errorlevel% equ 0 (
    echo [OK] Code successfully pushed to GitHub!
) else (
    echo [!] If prompted for password, generate a GitHub Personal Access Token:
    echo     https://github.com/settings/tokens (check 'repo' scope)
)
pause
