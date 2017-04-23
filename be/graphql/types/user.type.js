'use strict';
module.exports = ({
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
}) => {
    const {jwt} = require('../../../utils');
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
                resolve: ({id,name,updated_at}) => jwt.encode({data: {id: id, name: name, updated_at: updated_at}})
            }
        })
    });

   const attributesUserType = new GraphQLInputObjectType({
        name: 'UserAttributesType',
        description: 'only for mutation attributes',
        fields: () => ({
            id: {
                type: GraphQLInt,
            },
            password: {
                type: new GraphQLNonNull(GraphQLString),
            },
            name: {
                type: new GraphQLNonNull(GraphQLString),
            }
        })
    });

    return {
        query: UserType,
        attributes: attributesUserType,
    };
}
