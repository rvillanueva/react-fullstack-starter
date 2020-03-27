/**
 * Express configuration
 */

'use strict';

import express from 'express';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import path from 'path';
import lusca from 'lusca';
import hsts from 'hsts';
import config from './environment';
import passport from 'passport';
import session from 'express-session';
import {sequelize} from '../sqldb';

const SessionStore = require('connect-session-sequelize')(session.Store);

function conditionalHistoryApiFallback() {
  return function(req, res, next) {
    const allowedPaths = ['api', 'auth', 'components', 'app', 'assets'];
    if(allowedPaths.indexOf(req.url.split('/')[1]) > -1) {
      return next();
    } else {
      return require('connect-history-api-fallback')()(req, res, next);
    }
  };
}

function forceSecureConnection() {
  return function(req, res, next) {
    if(req.header('x-forwarded-proto') !== 'https' && !req.secure) {
      return res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      return next();
    }
  };
}

export default function(app) {
  var env = app.get('env');

  if(config.forceHttps) app.use(forceSecureConnection());

  if(env === 'development' || env === 'test') {
    app.use(express.static(path.join(config.root, '.tmp')));
  }

  if(env === 'production') {
    app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));
  }

  app.set('appPath', path.join(config.root, 'client'));
  app.use(express.static(app.get('appPath')));
  app.use(morgan('dev'));

  app.set('views', `${config.root}/server/views`);
  app.engine('html', require('ejs').renderFile);
  app.engine('js', require('ejs').renderFile);
  app.set('view engine', 'html');

  app.use(compression());
  app.use(function(req, res, next) {
    let data = '';
    req.on('data', function(chunk) {
      data += chunk;
    });
    req.on('end', function() {
      req.rawBody = data;
    });
    return next();
  });
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());


  // Persist sessions with MongoStore / sequelizeStore
  // We need to enable sessions for passport-twitter because it's an
  // oauth 1.0 strategy, and Lusca depends on sessions
  const sessionStore = new SessionStore({
    db: sequelize,
    table: 'session'
  });

  app.use(session({
    secret: config.secrets.session,
    saveUninitialized: true,
    resave: false,
    store: sessionStore
  }));


  /**
   * Lusca - express server security
   * https://github.com/krakenjs/lusca
   */
  if(env !== 'test' && !process.env.SAUCE_USERNAME) {
    app.use(lusca({
      csrf: false, // TODO reenable csrf protection later
      xframe: 'SAMEORIGIN',
      hsts: {
        maxAge: 31536000, //1 year, in seconds
        includeSubDomains: true,
        preload: true
      },
      xssProtection: true
    }));
  }

  if(env === 'production') {
    app.use(hsts({ maxAge: 15552000 })); // 180 days in seconds
    // Strict-Transport-Security: max-age: 15552000; includeSubDomains
  }

  if(env === 'development') {
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const stripAnsi = require('strip-ansi');
    const webpack = require('webpack');
    const webpackConfigDev = require('../../webpack.config.dev').default;
    const compiler = webpack(webpackConfigDev);
    const browserSync = require('browser-sync').create();

    /**
     * Run Browsersync and use middleware for Hot Module Replacement
     */
    browserSync.init({
      open: false,
      logFileChanges: false,
      proxy: `localhost:${config.port}`,
      ws: true,
      middleware: [
        conditionalHistoryApiFallback(),
        webpackDevMiddleware(compiler, {
          publicPath: webpackConfigDev.output.publicPath,
          noInfo: true,
          quiet: false,
          stats: {
            assets: false,
            colors: true,
            version: false,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false
          },
        }),
        webpackHotMiddleware(compiler)
      ],
      port: config.browserSyncPort,
      plugins: ['bs-fullscreen-message'],
      files: [
        'client/*.html'
      ]
    });

    /**
     * Reload all devices when bundle is complete
     * or send a fullscreen error message to the browser instead
     */
    compiler.hooks.done.tap('HotWebpackRecompile', function(stats) {
      console.log('Webpack recompiled.');
      if(stats.hasErrors() || stats.hasWarnings()) {
        return browserSync.sockets.emit('fullscreen:message', {
          title: 'Webpack Error:',
          body: stripAnsi(stats.toString()),
          timeout: 100000
        });
      }
      browserSync.reload();
    });
  }

  if(env === 'development' || env === 'test') {
    app.use(errorHandler()); // Error handler - has to be last
  }
}
