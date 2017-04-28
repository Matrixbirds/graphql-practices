'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.addColumn(
          'users', 'country',
          {
              type: Sequelize.STRING,
              allowNull: true,
          }
      )
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.removeColumn(
          'users', 'country'
      )
  }
};
