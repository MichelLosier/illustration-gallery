//Dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require ('body-parser');
const dotenv = require('dotenv').config({path: './server/.env'});
const mongoose = require('mongoose');


//Connect to DB
mongoose.connect(process.env.MLAB_DB_URI, {
	useMongoClient: true
});
const db = mongoose.connection;
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Routers
const api = require('./server/routes/api');
const index = require('./server/routes/index');

const app = express();

//Parsers for POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Point to static
app.use(express.static(path.join(__dirname, 'build')));

//API route
app.use('/api', api);

//All other routes go to index
app.use('*', index);

//set port and initialize
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => {
	console.log(`app running on localhost:${port}`);
});