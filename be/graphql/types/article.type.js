'use strict';
module.exports = ({
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt,
}) => {
    const {Article} = require('../../models');
    const Articletype = new GraphQLObjectType({
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
    return {
        itemType: Articletype,
        model: Article
    };
}
