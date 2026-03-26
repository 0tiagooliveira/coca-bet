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
pause
