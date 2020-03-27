/**
 * Main application file
 */

'use strict';

import express from 'express';
import config from './config/environment';
import http from 'http';
import {requestHandler, errorHandler} from './config/tracking';
// Setup server
var app = express();
var server = http.createServer(app);

var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client'
});
requestHandler(app);

require('./config/socketio').default(socketio);
require('./config/express').default(app);
require('./routes').default(app);
errorHandler(app);
require('./config/aws');

// Start server
async function init() {
  try {
    app.server = server.listen(config.port, config.ip, function() {
      console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
    });
  } catch(e) {
    console.log('Server failed to start due to error: %s', e);
    console.error(e);
  }
}

init();


// Expose app
exports = module.exports = app;
