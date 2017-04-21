'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.addIndex('users', ['name']);
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.removeIndex('users', ['name']);
  }
};
