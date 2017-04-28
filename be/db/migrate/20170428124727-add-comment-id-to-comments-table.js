'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => (
      queryInterface.addColumn(
          'comments',
          'comment_id',
          {
              type: Sequelize.INTEGER,
              allowNull: true,
          }
      ).then(() =>
          (queryInterface.addIndex('comments',['comment_id']))
    )
  ),
  down: (queryInterface, Sequelize) => (
      queryInterface.removeColumn(
          'comments',
          'comment_id'
      )
  )
};
