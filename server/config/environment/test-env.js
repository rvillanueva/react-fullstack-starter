/*eslint no-process-env:0*/

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  port: 9090,
  mongo: {
    uri: 'mongodb://localhost/dev-test'
  },
  forceHttps: false,
  sequelize: {
    uri: 'sqlite://',
    options: {
      logging: false,
      storage: 'test.sqlite',
      define: {
        timestamps: true
      }
    }
  }
};
