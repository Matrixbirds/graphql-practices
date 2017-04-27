'use strict';
module.exports = ({
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
}, {Comment}, Types) => {

    const {input: CommentInputType, query: CommentType} = Types.CommentType;

    const replyArticle = {
        type: CommenType,
        args: {
            input: new GraphQLNonNull(CommentInputType)
        },
        async resolve(_, {input}, {currentUser}) {

        }
    };

    const replyComment = {
        type: CommentType,
        args: {
            input: new GraphQLNonNull(CommentInputType)
        },
        async resolve(_, {input}, {currentUser}) {

        }
    };

    const removeComment = {
        type: CommentType,
        args: {
            input: new GraphQLNonNull(CommentInputType)
        },
        async resolve(_, {input}, {currentUser}) {

        }
    };

    const CommentMutation = {
        replyArticle: replyArticle,
        replyComment: replyComment,
        removeComment: removeCOmment,
    }
    return CommentMutation;
}
