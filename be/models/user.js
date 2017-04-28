'use strict';
const { freezeRequire, jwt }= require('../../utils');
const bcrypt = freezeRequire('bcrypt');

const countryEnums = ['CHINA', 'JAPAN'];

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('user', {
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
        },
        country: {
            type: DataTypes.ENUM,
            values: countryEnums,
            allowNull: true,
            validate: {
                isValid(val) {
                    if (!countryEnums.includes(val))
                        throw new Error('国家要么JAPAN要么CHINA', 'validate country error')
                }
            }
        }
    },
    {
        classMethods: {
            associate: function(models) {
                User.hasMany(models.Comment, { foreignKey: 'user_id' });
                User.hasMany(models.Article, { foreignKey: 'user_id' });
            },
            findByJwt: function(token) {
                const payload = jwt.decode(token);
                if (!payload) throw new Error("Token is Invalid");
                const data = payload['data'];
                if (!data) throw new Error("Token is Invalid");
                return User.findOne({where: {id: data.id}, raw: true}).then(user => {
                    if (!user) throw Error(`User ${data.id} id is not found`)
                    return user;
                });
            },
            async authentication({name, password}) {
                const user = await User.findOne({name: name});
                if (!user) throw Error(`User Not found`);
                if (!user.validPassword(password)) throw Error("Invalid Password");
                return user;
            },
            generateJWT({id, name, updated_at}) {
                return jwt.encode({data: {id: id, name: name, updated_at: updated_at}})
            },
        },
        instanceMethods: {
            generateHash(password) {
                return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
            },
            validPassword(password) {
                return bcrypt.compareSync(password, this.getDataValue('password_digest'));
            }
        },
        underscored: true
    });
    return User;
  };
