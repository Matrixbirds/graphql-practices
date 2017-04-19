'use strict';
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define('comment', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    article_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
          comment.belongsTo(models.user, { foreignKey: 'user_id' });
          comment.belongsTo(models.article, { foreignKey: 'article_id' });
      }
    },
    underscored: true
  });
  return comment;
};
