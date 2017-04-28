'use strict';

const graphql = require('graphql');
const models = require('../../models');
const types = require('../types');

const { __meta__ } =
    require('../../../utils').module({
        format: '.mutation.js',
        deps: [graphql, models, types],
        dir: require('path').resolve(__dirname, '.')
    });

const Mutations = {};
Object.assign(Mutations, __meta__);

function Mutation ({
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLInt
}) {
    const { defineMutationType } = require('../query_helpers');
    const { UserMutation, ArticleMutation, CommentMutation } = __meta__;

    return new GraphQLObjectType({
        name: 'Mutation',
        description: 'Mutation Root',
        fields: () => ({
            signUp: UserMutation.signUp,
            signIn: UserMutation.signIn,
            createArticle: ArticleMutation.create,
            editArticle: ArticleMutation.edit,
            removeArticle: ArticleMutation.destroy,
            replyArticle: CommentMutation.replyArticle,
            replyComment: CommentMutation.replyComment,
            removeComment: CommentMutation.removeComment,
        })
    });
};

Mutations['Mutation'] = Mutation(graphql, models);
module.exports = Mutations;
