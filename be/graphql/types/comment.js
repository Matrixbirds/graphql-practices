'use strict';
module.exports = function({
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
}) {
    const comment = new GraphQLObjectType({
    name: 'comment' ,
        description: '...',

        fields: () => ({
            id: {
                type: GraphQLInteger,
            },
        
            title: {
                type: GraphQLString,
            },
        
            content: {
                type: GraphQLString,
            },
        })
    });
    return comment;
}
