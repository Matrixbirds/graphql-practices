'use strict';
module.exports = function(sequelize, DataTypes) {
  var article = sequelize.define('article', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
          article.belongsTo(models.user, { foreignKey: 'user_id' })
      }
    },
    underscored: true
  });
  return article;
};
