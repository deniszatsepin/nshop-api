'use strict';
const authenticate = require('../utils/authenticate.js');

module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define('Users', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        len: [8, 100]
      },
      set: function(password) {
        var salt = authenticate.makeSalt();
        var encryptedPassword = authenticate.encryptPassword(password, salt);
        this.setDataValue('password', password);
        this.setDataValue('salt', salt);
        this.setDataValue('password_hash', encryptedPassword);
      }
    },
    password_hash: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    instanceMethods: {
      authenticate: function(plainText) {
        var salt = this.getDataValue('salt');
        return authenticate.encryptPassword(plainText, salt) === this.getDataValue('password_hash');
      }
    },
    setterMethods: {
    }
  });
  return Users;
};