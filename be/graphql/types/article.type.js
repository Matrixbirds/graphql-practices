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
        name: 'Article',
        description: 'only for query',

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

    const attributesArticleType = new GraphQLObjectType({
        name: 'ArticleAttributesType',
        description: 'only for mutation attributes',

        fields: () => ({
            id: {
                type: GraphQLInt,
            },
            title: {
                type: new GraphQLNonNull(GraphQLString),
            },
            content: {
                type: new GraphQLNonNull(GraphQLString),
            }
        })
    });
    return {
        query: ArticleType,
        attributes: attributesArticleType,
    };
}
