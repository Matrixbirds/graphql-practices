'use strict';

var fs        = require('fs');
var path      = require('path');
var basename  = path.basename(module.filename);

const {
    User,
    Article,
    Comment
} = require('../../models');

function QueryTypes({
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull,
    GraphQLSchema
}) {
    const Types = {};
    require('../../../utils')
        .readdirSync(__dirname, basename)
        .forEach(file => {
            const _type = require(path.join(__dirname, file))(arguments[0]);
            Types[_type.name] = _type;
        });

    return new GraphQLObjectType({
        name: 'BlogSchema',
        description: 'Root of the Blog Schema',
        fields: () => ({
            users: {
                type: new GraphQLList(Types.user),
                resolve: (page=0, per=10) => {
                    return User.findAll({offset: 0, limit: 100}).then(_users => {
                        return _users;
                    })
                }
            }
        })
    })
};

module.exports = QueryTypes(require('graphql'));
