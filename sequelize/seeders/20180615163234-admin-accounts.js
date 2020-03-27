'use strict';
const cryptoUtil = require('../../server/utils/crypto');
const defaultPassword = 'admin';
const users = [{
  _id: '5173e5ef-0526-4136-b0d5-24b8006051f0',
  provider: 'local',
  role: 'admin',
  name: 'Starting Admin',
  email: 'admin@example.com',
  password: defaultPassword
}];

function encryptUserPasswords(usersToEncrypt) {
  const promises = usersToEncrypt.map(async user => {
    user.salt = await cryptoUtil.makeSalt();
    user.password = await cryptoUtil.encryptPassword(user.password, user.salt);
    return user;
  });
  return Promise.all(promises);
}

module.exports = {
  up: async queryInterface => {
    const encryptedPasswordUsers = await encryptUserPasswords(users);
    await queryInterface.bulkInsert('users', encryptedPasswordUsers, {});
    return;
  },

  down: async(queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('users', {
      [Op.or]: users.map(user => ({ _id: user._id }))
    });
    return;
  }
};
