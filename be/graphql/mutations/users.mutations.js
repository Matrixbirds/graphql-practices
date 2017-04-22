'use strict';
module.exports = function User({
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
}) {
    const {User} = require('../../models');
    const {User: UserType} = require('../types');
    const createMutation = {
       type: UserType.itemType,
       args: {
           name: { type: GraphQLString },
           password: { type: GraphQLString },
       },
       resolve: (object, {name, password}) => {
           return User.create({name: name, password: password})
       }
    };

    return {
        create: createMutation
    };
}
