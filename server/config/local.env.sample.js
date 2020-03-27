'use strict';

// Use local.env.js for environment variables that will be set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:3000',
  DEPLOYMENT_NAME: 'development',
  SESSION_SECRET: 'dev-secret',
  TOKEN_ENCRYPTION_SECRET: 'dev-secret',
  FORCE_HTTPS: 'false', // default true

  AWS_ACCESS_KEY_ID: 'secret',
  AWS_SECRET_ACCESS_KEY: 'key',
  AWS_REGION: 'us-east-1',

  INTUIT_BASE_URL: 'https://sandbox-quickbooks.api.intuit.com/v3',
  INTUIT_APP_ID: 'id',
  INTUIT_APP_SECRET: 'secret',

  SENTRY_DSN_FRONTEND: 'dsn',
  SENTRY_DSN_BACKEND: 'dsn',

  SYSTEM_EMAIL_ADDRESS: 'noreply@domain.com',
  SYSTEM_EMAIL_NAME: 'No Reply',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
