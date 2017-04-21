'use strict';
module.exports = function(sequelize, DataTypes) {
  const Comment = sequelize.define('comment', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    article_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
          Comment.belongsTo(models.User, { foreignKey: 'user_id' });
          Comment.belongsTo(models.Article, { foreignKey: 'article_id' });
      }
    },
    underscored: true
  });
  return Comment;
};
