// This file configures the development web server
// which supports hot reloading and synchronized testing.
var nodemon = require('nodemon');
var path = require('path');

var serverPath = path.join(__dirname, '../server');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
nodemon(`-w ${serverPath} ${serverPath}`)
