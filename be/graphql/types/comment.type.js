'use strict';
module.exports = ({
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
}) => {
    const CommentType = new GraphQLObjectType({
    name: 'Comment' ,
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
   const attributesCommentType = new GraphQLObjectType({
        name: 'CommentAttributesType',
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
        query: CommentType,
        attributes: attributesCommentType,
    };
}
