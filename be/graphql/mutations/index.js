'use strict';

const graphql = require('graphql');
const models = require('../../models');

const { __meta__ } =
    require('../../../utils').module({
        format: '.mutation.js',
        deps: [graphql, models],
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
    const { UserMutation } = __meta__;

    return new GraphQLObjectType({
        name: 'Mutation',
        description: 'Mutation Root',
        fields: () => ({
            signUp: UserMutation.signUp,
            signIn: UserMutation.signIn,
        })
    });
};

Mutations['Mutation'] = Mutation(graphql, models);
module.exports = Mutations;
