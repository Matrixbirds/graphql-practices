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
    GraphQLSchema,
    GraphQLInt
}) {
    const Types = {};
    const graphql = arguments[0]
    require('../../../utils')
        .readdirSync(__dirname, basename)
        .forEach(file => {
            const _type = require(path.join(__dirname, file))(graphql);
            Types[_type.name] = _type;
        });

    const pagination = require('../pagination')(graphql);

    return new GraphQLObjectType({
        name: 'BlogSchema',
        description: 'Root of the Blog Schema',
        fields: () => ({
            users: {
                type: pagination.Page(Types.user),
                args: {
                    page: { type: GraphQLInt },
                    per: { type: GraphQLInt },
                },
                resolve: (root, {page, per}) => {
                    page = Math.max(page-1, 0);
                    per = Math.max(per, 0);
                    return User.findAndCountAll({
                        offset: +page, limit: +per
                    }).then(_users => {
                        return _users;
                    })
                }
            }
        })
    });
};

module.exports = QueryTypes(require('graphql'));
