@echo off
echo BACKUP VIA DOCKER

:: Configurações
set CONTAINER_NAME=vitalys_postgres_db
set DB_USER=vitalys
set DB_NAME=vitalysdb
set DB_PASS=vitalys

set FILENAME=backup_vitalys_1234.sql

echo Gerando arquivo: %FILENAME% a partir do container %CONTAINER_NAME%...

:: Comando Docker
:: -i: interativo
:: executa pg_dump dentro do container e redireciona (>) para arquivo local
docker exec -e PGPASSWORD=%DB_PASS% %CONTAINER_NAME% pg_dump -U %DB_USER% --clean --if-exists %DB_NAME% > %FILENAME%

if %ERRORLEVEL% EQU 0 (
    echo Backup realizado com SUCESSO! Arquivo criado: %FILENAME%
) else (
    echo ERRO ao realizar o backup. Verifique se o container esta rodando.
)

pause