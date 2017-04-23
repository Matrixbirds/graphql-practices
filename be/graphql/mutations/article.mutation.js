'use strict';
module.exports = ({
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
}) => {
    const [Models, Types] = [require('../../models'), require('../types')];

    const ArticleType = Types.ArticleType.attributes;

    const createMutation = {
        type: ArticleType,
        args: {
            title: { type:  GraphQLString },
            content: { type:  GraphQLString },
        },
        resolve: (object, args) => {
            return Models.Article.create(args);
        }
     };

    const updateMutation = {
        type: ArticleType,
        args: {
            title: { type:  GraphQLString },
            content: { type:  GraphQLString },
        },
        resolve: (object, args) => {
            return Models.Article.update(args);
        }
    };

    const destroyMutation = {
        type: ArticleType,
        args: {
            title: { type:  GraphQLString },
            content: { type:  GraphQLString },
        },
        resolve: (object, args) => {
            return Models.Article.destroy(args);
        }
    };


    const ArticleMutation = {
        create: createMutation,
        update: updateMutation,
        destroy: destroyMutation,
    }
    return ArticleMutation;
}
