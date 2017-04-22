'use strict';
module.exports = function Comment({
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
}) {
    const {Comment} = require('../../models');
    const CommentType = new GraphQLObjectType({
    name: 'comment' ,
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
        itemType: CommentType,
        model: Comment,
    };
}
