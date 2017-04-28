'use strict';
module.exports = function ({
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLID,
}, {Article, Comment, User: Me}, {DateScalar, CountryScalar}) {

    const {definePaginateType} = require('../query_helpers');

    const MyArticleType = new GraphQLObjectType({
        name: 'myArticleType',
        description: 'my article type',
        fields: () => ({
            id: { type: GraphQLID },
            title: { type: GraphQLString },
            content: { type: GraphQLString },
            created_at: { type: DateScalar },
            updated_at: { type: DateScalar },
        })
    });

    const MyCommentType = new GraphQLObjectType({
        name: 'myCommentType',
        description: 'my comment type',
        fields: () => ({
            id: { type: GraphQLID },
            title: { type: GraphQLString },
            content: { type: GraphQLString },
            created_at: { type: DateScalar },
            updated_at: { type: DateScalar },
        })
    });

    const MyProfileType = new GraphQLObjectType({
        name: 'myProfileType',
        description: 'my profile type',
        fields: () => ({
            name: { type: GraphQLString },
            country: { type: CountryScalar },
            created_at: { type: DateScalar },
            updated_at: { type: DateScalar },
        })
    });

    const MeType = new GraphQLObjectType({
        name: 'MeType' ,
        description: '...',

        fields: () => ({
            articles: definePaginateType(MyArticleType, Article, true),
            article: {
                type: MyArticleType,
                args: {
                    id: { type: new GraphQLNonNull(GraphQLID) },
                },
                async resolve(user, {id}) {
                    const _article = await Article.findOne({where: {id: id, user_id: user.id}})
                    if (!_article) throw Error(`Article ${id} id is not found`);
                    return _article;
                }
            },
            comments: definePaginateType(MyCommentType, Comment),
            profile: {
                type: MyProfileType,
                resolve(user) { return user }
            },
        })
    });

    return {
        default: MeType,
    };
}
