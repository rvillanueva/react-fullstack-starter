'use strict';

module.exports = {
  up: async(queryInterface, DataTypes) => {
    await queryInterface.createTable('sessions', {
      sid: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      userId: DataTypes.STRING,
      expires: DataTypes.DATE,
      data: DataTypes.STRING(50000),
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    });
    await queryInterface.createTable('users', {
      _id: {
        primaryKey: true,
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: {
          msg: 'The specified email address is already in use.'
        },
        validate: {
          isEmail: true
        }
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'user'
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        }
      },
      provider: DataTypes.STRING,
      salt: DataTypes.STRING,
      passwordResetToken: DataTypes.STRING,
      passwordResetTokenExpiresAt: DataTypes.DATE,
      emailVerificationToken: DataTypes.STRING,
      emailVerificationTokenExpiresAt: DataTypes.DATE,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    });
    await queryInterface.addConstraint('users', ['email'], {
      type: 'unique',
      name: 'users_email_uk'
    });
  },

  down: async queryInterface => {
    await queryInterface.removeConstraint('users', 'users_email_uk');
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('sessions');
  }
};
