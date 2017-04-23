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

    const createMutation = {
       type: Types.UserType,
       args: {
           name: { type:  GraphQLString },
           password: { type:  GraphQLString },
       },
       resolve: (object, args) => {
           return Models.User.create(args);
       }
    };

    const updateMutation = {
       type: Types.UserType,
       args: {
           name: { type:  GraphQLString },
           password: { type:  GraphQLString },
       },
       resolve: (object, args) => {
           return Models.User.update(args);
       }
    };

    const destroyMutation = {
       type: Types.UserType,
       args: {
           name: { type:  GraphQLString },
           password: { type:  GraphQLString },
       },
       resolve: (object, args) => {
           return Models.User.destroy(args);
       }
    };


    const UserMutation = {
        create: createMutation,
        update: updateMutation,
        destroy: destroyMutation,
    }
    return UserMutation;
}
