/*eslint no-process-env:0*/

// Production specific configuration
// =================================

// Heroku URI provided
module.exports = {
  // Server IP
  ip: process.env.OPENSHIFT_NODEJS_IP
    || process.env.ip
    || undefined,

  // Server port
  port: process.env.OPENSHIFT_NODEJS_PORT
    || process.env.PORT
    || 8080,

  forceHttps: process.env.FORCE_HTTPS !== 'false',

  // MongoDB connection options
  mongo: {
    uri: process.env.MONGODB_URI
      || process.env.MONGOHQ_URL
      || process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME
      || 'mongodb://localhost/dev'
  },

  redis: {
    uri: process.env.REDIS_URL || 'redis://'
  },

  // Postgres connection options
  sequelize: {
    uri: process.env.DATABASE_URL || 'postgres://',
    dialect: 'postgres',
    logging: false,
    storage: 'dist.postgres',
    define: {
      timestamps: true
    }
  }
};
