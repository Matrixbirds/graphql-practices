'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.addIndex('articles', ['user_id']).then(
          queryInterface.addIndex('comments', ['user_id'])
      ).then(
          queryInterface.addIndex('comments', ['article_id'])
      );
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.removeIndex('articles', ['user_id']).then(
          queryInterface.removeIndex('comments', ['user_id'])
      ).then(
          queryInterface.removeIndex('comments', ['article_id'])
      );
  }
};
