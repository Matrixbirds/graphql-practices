'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
          user.hasMany(models.comment, { foreignKey: 'user_id' });
          user.hasMany(models.article, { foreignKey: 'user_id' });
      }
    },
    underscored: true
  });
  return user;
};
