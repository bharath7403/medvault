@echo off
title MedVault - Master Launcher
color 0A

echo =========================================================
echo       MedVault Platform - Master System Launcher
echo =========================================================
echo.

echo [*] Checking PostgreSQL Database Service...
sc query postgresql-x64-16 | findstr /I "RUNNING" >nul
if %errorlevel% neq 0 (
    echo [!] Starting PostgreSQL Service...
    net start postgresql-x64-16 >nul 2>&1
)
echo [OK] PostgreSQL Database ready on port 5432.
echo.

echo [1/3] Starting Frontend UI (React + Vite on Port 3000)...
start "MedVault Frontend" cmd /k "cd /d D:\BHARATH\PROJECTS\medvault\frontend && npm run dev"

timeout /t 2 /nobreak >nul

echo [2/3] Starting AI Intelligence Engine (Python FastAPI on Port 8000)...
start "MedVault AI Engine" cmd /k "cd /d D:\BHARATH\PROJECTS\medvault\ai-service && py -m uvicorn main:app --reload --port 8000"

timeout /t 2 /nobreak >nul

echo [3/3] Starting Backend Server (Spring Boot on Port 8080)...
start "MedVault Backend" cmd /k "cd /d D:\BHARATH\PROJECTS\medvault\backend && mvnw.cmd spring-boot:run"

echo.
echo =========================================================
echo       All MedVault Services Successfully Launched!
echo =========================================================
echo.
echo  * Web Application:  http://localhost:3000
echo  * Backend API:      http://localhost:8080/api/health
echo  * AI Engine Docs:   http://localhost:8000/docs
echo  * PostgreSQL DB:    localhost:5432 (medvaultdb)
echo.
echo  * Demo Credentials:
echo      Email:    bharath.demo@medvault.health
echo      Password: password123
echo      (Or use "1-Click Instant Demo Login" in UI)
echo.
echo Opening browser to http://localhost:3000 ...
timeout /t 3 /nobreak >nul
start http://localhost:3000
