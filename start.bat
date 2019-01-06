echo Starting Database
start cmd.exe /c "mongod --dbpath D:\Data\Trudvang"
timeout /t 5
echo Starting Web-server
start cmd.exe /c "nodemon server.js"