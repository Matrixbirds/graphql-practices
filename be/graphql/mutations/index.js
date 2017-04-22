'use strict';

const Mutations = {};
const graphql = require('graphql');
const path = require('path');
const basename = path.basename(module.filename);


const {readdirSync, fileFormat} = require('../../../utils');

readdirSync(__dirname, basename)
    .filter(fileFormat('.mutations.js'))
    .forEach(file => {
        const _mutation = require(path.join(__dirname, file));
        Mutations[_mutation.name] = _mutation(graphql);
    })

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
            createUser: Mutations.User.create,
        })
    });
};


Mutations['Mutation'] = Mutation;

module.exports = Mutations;
