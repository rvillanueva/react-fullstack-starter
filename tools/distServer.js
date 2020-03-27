// This file configures a web server for testing the production build
// on your local machine.

var nodemon = require('nodemon');
var path = require('path');

const localEnvObj = require('../server/config/local.env.js');
Object.keys(localEnvObj).forEach(key => {
  process.env[key] = String(localEnvObj[key]);
});
/* eslint-disable no-console */

process.env.NODE_ENV = process.env.NODE_ENV || 'production';
var serverPath = path.join(__dirname, '../dist/server');

console.log('Opening production build...');

nodemon(`-w ${serverPath} ${serverPath}`);
