@echo off
chcp 65001 >nul
title Barry Aliou Shop - Serveur & Base de donnees
cd /d "%~dp0"

echo ========================================================
echo    BARRY ALIOU SHOP - LANCEMENT DU SITE WEB
echo ========================================================
echo.

if not exist "node_modules" (
    echo Installation des dependances en cours...
    call npm install
    echo.
)

echo Ouverture de la boutique dans votre navigateur : http://localhost:3000
start "" "http://localhost:3000"

echo Demarrage du serveur et de la base de donnees SQLite...
echo (Gardez cette fenetre ouverte pendant votre utilisation)
echo.
node server.js

pause
