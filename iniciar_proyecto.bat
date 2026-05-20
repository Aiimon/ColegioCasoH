@echo off
title Lanzador de Microservicios - Colegio B. O'Higgins
echo =======================================================
echo Lanzando ecosistema escolar en el orden correcto...
echo =======================================================

:: 1. Iniciar Eureka Server
echo [1/5] Iniciando Eureka Server...
start "Eureka Server" cmd /k "cd /d %~dp0infraestrucuredomain\eurekaServer && mvn spring-boot:run"
timeout /t 12 /nobreak > null

:: 2. Iniciar Gestion Academica
echo [2/5] Iniciando Gestion Academica (H2 + import.sql)...
start "Gestion Academica" cmd /k "cd /d %~dp0businessdomain\gestion-academica && mvn spring-boot:run"
timeout /t 8 /nobreak > null

:: 3. Iniciar Asistencia y Conducta
echo [3/5] Iniciando Asistencia y Conducta...
start "Asistencia Conducta" cmd /k "cd /d %~dp0businessdomain\asistencia-conducta && mvn spring-boot:run"
timeout /t 8 /nobreak > null

:: 4. Iniciar API Gateway
echo [4/5] Iniciando API Gateway...
start "API Gateway" cmd /k "cd /d %~dp0infraestrucuredomain\apigateway && mvn spring-boot:run"
timeout /t 5 /nobreak > null

:: 5. Iniciar Frontend (React)
echo [5/5] Iniciando Frontend en React...
start "React Frontend" cmd /k "cd /d %~dp0colegio-frontend && npm run dev"

echo =======================================================
echo ¡Todo ha sido lanzado con exito!
echo Puedes cerrar esta ventana.
echo =======================================================
pause

:: taskkill /F /IM java.exe /IM node.exe