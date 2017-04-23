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
        })
    });
};


Mutations['Mutation'] = Mutation;

module.exports = Mutations;
