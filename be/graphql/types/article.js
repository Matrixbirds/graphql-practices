'use strict';
module.exports = function Article({
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt,
}) {
    const {Article} = require('../../models');
    const Article = new GraphQLObjectType({
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
            },
        })
    });
    return {
        itemType: ArticleType,
        model: Article
    };
}
