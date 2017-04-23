'use strict';
module.exports = ({
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt,
}) => {
    const ArticleType = new GraphQLObjectType({
        name: 'Article' ,
        description: '...',

        fields: () => ({
            id: {
                type: GraphQLInt,
            },
            title: {
                type: GraphQLString,
            },
            content: {
                type: GraphQLString,
            }
        })
    });
    return ArticleType;
}
