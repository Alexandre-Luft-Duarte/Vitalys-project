@echo off
echo RESTAURACAO VIA DOCKER
set /p FILENAME="backup_vitalys_1234.sql"

:: Configurações
set CONTAINER_NAME=vitalys_postgres_db
set DB_USER=vitalys
set DB_NAME=vitalysdb
set DB_PASS=vitalys

echo Restaurando %FILENAME% no container %CONTAINER_NAME%...

:: Comando Docker
:: 'type' le o arquivo local e o pipe (|) joga para dentro do docker exec
:: -i (interactive) eh obrigatorio aqui para o docker aceitar a entrada
type %FILENAME% | docker exec -i -e PGPASSWORD=%DB_PASS% %CONTAINER_NAME% psql -U %DB_USER% -d %DB_NAME%

if %ERRORLEVEL% EQU 0 (
    echo Restore realizado com SUCESSO!
) else (
    echo ERRO ao realizar o restore.
)

pause