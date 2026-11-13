@echo off
title UEFA Champions League - Servidor Local
color 0B
echo ========================================================
echo   INICIANDO SERVIDOR LOCAL PARA LA CHAMPIONS LEAGUE
echo ========================================================
echo.
echo Abriendo servidor en http://localhost:8000
echo (Presiona Ctrl+C en esta ventana cuando quieras detenerlo)
echo.

python -m http.server 8000 || npx http-server -p 8000 || node -e "const http=require('http'),fs=require('fs'),path=require('path');http.createServer((req,res)=>{let f=path.join(__dirname,req.url==='/'?'index.html':req.url);fs.readFile(f,(err,data)=>{if(err){res.writeHead(404);res.end('Not Found');}else{res.writeHead(200);res.end(data);}})}).listen(8000,()=>console.log('Servidor en http://localhost:8000'));"

pause
