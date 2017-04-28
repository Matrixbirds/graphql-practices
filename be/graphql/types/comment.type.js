'use strict';
module.exports = ({
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLID,
}, _, {DateScalar}) => {
    const CommentType = new GraphQLObjectType({
        name: 'Comment' ,
        description: 'comment type',
        fields: () => ({
            id: {
                type: GraphQLID,
            },
            title: {
                type: GraphQLString,
            },
            content: {
                type: GraphQLString,
            },
            created_at: {
                type: DateScalar,
            },
            article_id: {
                type: GraphQLID
            },
            comment_id: {
                type: GraphQLID
            }
        })
    });

   const replyArticleInput = new GraphQLInputObjectType({
        name: 'replyArticleInput',
        description: 'replyArticle mutation input type',
        fields: () => ({
            article_id: {
                type: new GraphQLNonNull(GraphQLID),
            },
            title: {
                type: new GraphQLNonNull(GraphQLString),
            },
            content: {
                type: new GraphQLNonNull(GraphQLString),
            }
        })
    });

    const replyCommentInput = new GraphQLInputObjectType({
        name: 'replyCommentInput',
        description: 'replyComment mutation input type',
        fields: () => ({
            title: {
                type: new GraphQLNonNull(GraphQLString),
            },
            comment_id: {
                type: new GraphQLNonNull(GraphQLID),
            },
            title: {
                type: new GraphQLNonNull(GraphQLString),
            },
            content: {
                type: new GraphQLNonNull(GraphQLString),
            },
        })
    });

    const queryInputType = new GraphQLInputObjectType({
        name: 'queryCommentInput',
        description: 'only for query comment input',
        fields: () => ({
            id: {
                type: new GraphQLNonNull(GraphQLID),
            }
        })
    })

    return {
        query: CommentType,
        queryInputType: queryInputType,
        replyArticleInput: replyArticleInput,
        replyCommentInput: replyCommentInput,
    };
}
