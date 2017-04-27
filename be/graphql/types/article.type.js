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
}, {User}, {DateScalar, CountryScalar}) => {

    const Interfaces = require('../interfaces');

    const UserProfileInterface = Interfaces.UserInterface.default;

    const AuthorType = new GraphQLObjectType({
        name: 'author',
        description: 'author info',
        fields: () => ({
            name: {
                type: GraphQLString,
            },
            birthday: { type: DateScalar },
            country: { type: CountryScalar },
            created_at: { type: DateScalar },
            updated_at: { type: DateScalar },

        }),
        isTypeOf: data => data,
        interfaces: [UserProfileInterface],
    });

    const ArticleType = new GraphQLObjectType({
        name: 'article',
        description: 'only for query',

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
            updated_at: {
                type: DateScalar
            },
            author: {
                type: AuthorType,
                async resolve ({user_id}) {
                    //const _user = await object.
                    return User.findById(user_id)
                }
            }
        })
    });

    const ArticleInputType = new GraphQLInputObjectType({
        name: 'articleInputType',
        description: 'only for mutation attributes',
        fields: () => ({
            id: {
                type: GraphQLID,
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
        input: ArticleInputType,
    };
}
