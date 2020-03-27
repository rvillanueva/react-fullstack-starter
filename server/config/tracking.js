const Sentry = require('@sentry/node');
import config from './environment';
export function requestHandler(app) {
  if(config.sentry.backendDSN) {
    Sentry.init({ dsn: config.sentry.backendDSN, environment: config.deployment});
    app.use(Sentry.Handlers.requestHandler());
  }
}

export function errorHandler(app) {
  if(config.sentry.backendDSN) {
    app.use(Sentry.Handlers.errorHandler());
  }
  app.use(handleError);
}

function handleError(err, req, res, next) { //eslint-disable-line no-unused-vars
  console.error(err);
  return res.status(500).end();
}
