'use strict';

const graphql = require('graphql');
const path = require('path');
const basename  = path.basename(module.filename);

const {importSubModule} = require('../../../utils');

const Types = importSubModule(__dirname, '.type.js')(graphql);
const Models = require('../../models');

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
            users: definePaginateType(Types.UserType, Models.User),
            comments: definePaginateType(Types.CommentType, Models.Comment),
            user: defineEntityType(Types.UserType, Models.User),
            comment: defineEntityType(Types.CommentType, Models.Comment),
        })
    });
};

Types['QueryType'] = QueryType;

module.exports = Types;

