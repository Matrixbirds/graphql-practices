'use strict';
module.exports = ({
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
}) => { const {jwt} = require('../../../utils');
    const UserType = new GraphQLObjectType({
        name: 'user',
        description: '...',

        fields: () => ({
            name: {
                type: GraphQLString,
            },
            id: {
                type: GraphQLInt,
            },
            created_at: {
                type: GraphQLString
            },
            updated_at: {
                type: GraphQLString
            },
            token: {
                type: GraphQLString,
            }
        })
    });

    const authInputType = new GraphQLInputObjectType({
        name: 'authInput',
        fields: () => ({
            name: { type: new GraphQLNonNull(GraphQLString) },
            password: { type: new GraphQLNonNull(GraphQLString) },
        })
    });

    return {
        query: UserType,
        authInput: authInputType,
    };
}
