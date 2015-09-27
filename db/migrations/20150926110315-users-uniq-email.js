'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn('Users', 'email', {
      type: Sequelize.STRING,
      unique: true
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn('Users', 'email', {
      type: Sequelize.STRING,
      unique: false
    })
  }
};
