const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
var cors = require('cors')
var mongoose = require('mongoose');

// Get our API routes
const userService = require('./server/routes/user');
const characterService = require('./server/routes/character');
const api = require('./server/routes/api');
const app = express();

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

app.options('*', cors());
app.use(cors());

// Set our api routes
app.use('/api', api);
app.use('/api/character', characterService);
app.use('/api/user', userService);


const dbIp = process.env.DB_IP || '127.0.0.1';
var mongoDB = 'mongodb://' + dbIp + '/Trudvang';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '80';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));