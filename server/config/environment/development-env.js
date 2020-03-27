/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {
  redis: {
    uri: 'redis://localhost:6379'
  },
  forceHttps: false,
  // Postgres connection options
  sequelize: {
    uri: process.env.DATABASE_URL || 'postgres://',
    dialect: 'postgres',
    logging: false,
    storage: 'dev.postgres',
    define: {
      timestamps: true
    }
  },
  // Seed database on startup
  seedDB: true

};
