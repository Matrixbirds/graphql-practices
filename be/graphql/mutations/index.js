'use strict';

const graphql = require('graphql');
const path = require('path');
const basename = path.basename(module.filename);

const {importSubModule} = require('../../../utils');

const Mutations = importSubModule(__dirname, '.mutation.js')(graphql);

function Mutation({
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLInt
}) {
    const { defineMutationType } = require('../query_helpers');

    return new GraphQLObjectType({
        name: 'Mutation',
        description: 'Mutation Root',
        fields: () => ({
            createUser: Mutations.UserMutation.create,
            login: Mutations.UserMutation.login,
            updateUser: Mutations.UserMutation.update,
            destroyUser: Mutations.UserMutation.destroy,
            createArticle: Mutations.ArticleMutation.create,
            updateArticle: Mutations.ArticleMutation.update,
            destroyArticle: Mutations.ArticleMutation.destroy,
            createComment: Mutations.CommentMutation.create,
            updateComment: Mutations.CommentMutation.update,
            destroyComment: Mutations.CommentMutation.destroy,
        })
    });
};


Mutations['Mutation'] = Mutation;

module.exports = Mutations;
