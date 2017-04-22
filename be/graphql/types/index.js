'use strict';

const Types = {};
const graphql = require('graphql');
const path = require('path');
const basename  = path.basename(module.filename);

const {readdirSync, fileFormat} = require('../../../utils');

readdirSync(__dirname, basename)
    .filter(fileFormat('.types.js'))
    .forEach(file => {
        const _type = require(path.join(__dirname, file));
        Types[_type.name] = _type(graphql);
    });

function QueryType({
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLInt
}) {
    const { definePaginateType, defineEntityType } = require('../query_helpers');

    return new GraphQLObjectType({
        name: 'BlogSchema',
        description: 'Root of the Blog Schema',
        fields: () => ({
            users: definePaginateType(Types.User),
            comments: definePaginateType(Types.Comment),
            user: defineEntityType(Types.User),
            comment: defineEntityType(Types.Comment),
        })
    });
};

Types['QueryType'] = QueryType;

module.exports = Types;

