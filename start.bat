echo Starting Database
start cmd.exe /c "mongod --dbpath E:\mongodata\Trudvang"
timeout /t 5
echo Starting Web-server
start cmd.exe /c "nodemon server.js"
timeout /t 5
echo Open connections
"./ngrok.exe" http 80