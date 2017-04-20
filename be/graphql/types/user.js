'use strict';
module.exports = function({
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
}) {
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
            }
        })
    });
    return UserType;
}
