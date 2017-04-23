'use strict';

const graphql = require('graphql');
const path = require('path');
const basename  = path.basename(module.filename);

const {importSubModule} = require('../../../utils');

const Types = importSubModule(__dirname, '.type.js')(graphql);

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
            users: definePaginateType(Types.UserType),
            comments: definePaginateType(Types.CommentType),
            user: defineEntityType(Types.UserType),
            comment: defineEntityType(Types.CommentType),
        })
    });
};

Types['QueryType'] = QueryType;

module.exports = Types;

