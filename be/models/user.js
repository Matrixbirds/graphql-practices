'use strict';
const freezeRequire = require('../../utils').freezeRequire;
const bcrypt = freezeRequire('bcrypt');

module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
            unique: {
                msg: '用户名已存在'
            }
        },
        password_digest: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.VIRTUAL,
            set(password) {
                this.setDataValue('password', password);
                this.setDataValue('password_digest', this.generateHash(password));
            },
            validate: {
                isLongEnough(val) {
                    if (val.length < 7) {
                        throw new Error("密码最少7位")
                    }
                }
            }
        }
    },
    {
        classMethods: {
            associate: function(models) {
                user.hasMany(models.comment, { foreignKey: 'user_id' });
                user.hasMany(models.article, { foreignKey: 'user_id' });
            }
        },
        instanceMethods: {
            generateHash(password) {
                return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
            },
            validPassword(password) {
                return bcrypt.compareSync(password, this.password_digest);
            }
        },
        underscored: true
    });
    return user;
  };
