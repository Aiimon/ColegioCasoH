@echo off
title Detenedor de Microservicios - Colegio B. O'Higgins
echo =======================================================
echo Deteniendo el ecosistema escolar de forma segura...
echo =======================================================

echo Eliminando procesos de Java (Microservicios)...
taskkill /F /IM java.exe /T >nul 2>&1

echo Eliminando procesos de Node (Frontend React)...
taskkill /F /IM node.exe /T >nul 2>&1

echo =======================================================
echo ¡Todo el ecosistema ha sido detenido! 
echo Memoria RAM liberada con exito.
echo =======================================================
timeout /t 3
exit