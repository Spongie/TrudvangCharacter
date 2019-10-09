echo Starting Database
start cmd.exe /c "mongod --dbpath E:\Database\Prod\Trudvang"
timeout /t 5
echo Starting Web-server
start cmd.exe /c "npm server.js"