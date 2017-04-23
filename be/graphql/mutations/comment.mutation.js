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

    const CommentType = Types.CommentType.attributes;

    const createMutation = {
        type: CommentType,
        args: {
            title: { type:  GraphQLString },
            content: { type:  GraphQLString },
        },
        resolve: (object, args) => {
            return Models.Comment.create(args);
        }
     };

    const updateMutation = {
        type: CommentType,
        args: {
            title: { type:  GraphQLString },
            content: { type:  GraphQLString },
        },
        resolve: (object, args) => {
            return Models.Comment.update(args, {where: {_id: object.id}});
        }
     };

    const destroyMutation = {
        type: CommentType,
        args: {
            id: { type: GraphQLInt },
        },
        resolve: (object, args) => {
            return Models.Comment.destroy(args);
        }
     };


    const CommentMutation = {
        create: createMutation,
        update: updateMutation,
        destroy: destroyMutation,
    }
    return CommentMutation;
}
