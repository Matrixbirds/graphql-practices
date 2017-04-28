'use strict';
module.exports = ({
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
}, {Comment, Article, sequelize}, Types) => {

    const {
        replyArticleInput,
        replyCommentInput,
        queryInputType,
        query: CommentType
    } = Types.CommentType;


    const replyArticle = {
        type: CommentType,
        args: {
            input: {type: new GraphQLNonNull(replyArticleInput)}
        },
        async resolve(_, {input}, {currentUser}) {
            const _user = await currentUser;
            Object.assign(input, {user_id: _user.user_id});
            return sequelize.transaction(t => {
                return Article.findOne({where: {id: input.article_id}}, {transaction: t})
                    .then(_article => {
                        if (!_article) throw Error(`Article id ${input.article_id} is not found`)
                        return Comment.create(input, {transaction: t})
                    })
            })
        }
    };

    const replyComment = {
        type: CommentType,
        args: {
            input: {type: new GraphQLNonNull(replyCommentInput)}
        },
        async resolve(_, {input}, {currentUser}) {
            const _user = await currentUser;
            Object.assign(input, {user_id: _user.user_id});
            return sequelize.transaction(t => {
                return Comment.findOne({where: {id: input.comment_id }}, {transaction: t})
                    .then(_comment => {
                        if (!_comment) throw Error(`Comment id ${input.comment_id} is not found`)
                        Object.assign(input, {article_id: _comment.article_id})
                        return Comment.create(input, {transaction: t})
                    })
            })
        }
    };

    const removeComment = {
        type: CommentType,
        args: {
            input: {type: new GraphQLNonNull(queryInputType)}
        },
        async resolve(record, {input}, {currentUser}) {
            const _user = await currentUser;
            const _comment = await Comment.findOne({where: {id: input.id, user_id: _user.user_id}})
            if (!_comment) throw Error(`Comment id ${input.id} is not found`)
            return _comment.destroy({});
        }
    };

    const CommentMutation = {
        replyArticle: replyArticle,
        replyComment: replyComment,
        removeComment: removeComment,
    }
    return CommentMutation;
}
