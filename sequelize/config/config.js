if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  process.env.DATABASE_URL = require('../../server/config/local.env').DATABASE_URL;
}
const parse = require('pg-connection-string').parse;
const parsed = parse(process.env.DATABASE_URL || '');

module.exports = {
  development: {
    username: parsed.user || '',
    password: parsed.password || null,
    database: parsed.database || '',
    host: parsed.host || '127.0.0.1',
    dialect: 'postgres',
    define: {
      timestamps: true
    }
  },
  test: {
    username: parsed.user,
    password: parsed.password,
    database: parsed.database,
    host: parsed.host,
    port: parsed.port,
    dialect: 'postgres',
    ssl: true,
    define: {
      timestamps: true
    },
    dialectOptions: {
      ssl: {
        require: true
      }
    }
  },
  production: {
    username: parsed.user,
    password: parsed.password,
    database: parsed.database,
    host: parsed.host,
    port: parsed.port,
    dialect: 'postgres',
    ssl: true,
    define: {
      timestamps: true
    },
    dialectOptions: {
      ssl: {
        require: true
      }
    }
  }
};
