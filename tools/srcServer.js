// This file configures the development web server
// which supports hot reloading and synchronized testing.
const nodemon = require('nodemon');
const path = require('path');

const localEnvObj = require('../server/config/local.env.js');
Object.keys(localEnvObj).forEach(key => {
  process.env[key] = String(localEnvObj[key]);
});

const serverPath = path.join(__dirname, '../server');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
nodemon(`-w ${serverPath} ${serverPath}`);
