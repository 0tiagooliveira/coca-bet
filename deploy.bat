@echo off
echo Iniciando deploy automático para o GitHub e Firebase...
git add .
set commit_msg=Deploy automático %date% %time%
git commit -m "%commit_msg%" || echo Nenhuma alteração para commitar.
git push origin main
echo Deploy para o GitHub concluído!
echo Iniciando deploy para o Firebase...
call firebase deploy
echo Deploy concluído!

REM Tenta ler o APP_URL do .env.local
for /f "usebackq tokens=1,2 delims==" %%A in (".env.local") do (
	if "%%A"=="APP_URL" set APP_URL=%%B
)

if defined APP_URL (
	echo Seu app est disponvel em: %APP_URL%
) else (
	echo [ATENCAO] Defina APP_URL no arquivo .env.local para mostrar o link do app automaticamente.
	echo Exemplo: APP_URL=https://seu-app.web.app
)
pause
