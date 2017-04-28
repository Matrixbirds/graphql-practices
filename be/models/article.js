'use strict';
module.exports = function(sequelize, DataTypes) {
  const Article = sequelize.define('article', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
  }, {
    classMethods: {
      associate: function(models) {
          Article.belongsTo(models.User, { foreignKey: 'user_id' })
      }
    },
    underscored: true
  });
  return Article;
};
