'use strict';
module.exports = ({
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
}) => {
    const {jwt} = require('../../../utils');
    const UserType = new GraphQLObjectType({
        name: 'user',
        description: '...',

        fields: () => ({
            name: {
                type: new GraphQLNonNull(GraphQLString),
                resolve: user => user.name,
            },
            id: {
                type: new GraphQLNonNull(GraphQLString),
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
    return UserType;
}
