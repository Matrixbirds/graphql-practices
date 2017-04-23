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

    const UserType = Types.UserType.query;
    const UserAttributesType = Types.UserType.attributes;
    const {OperateStatusType} = require('../query_helpers');

    const createMutation = {
       type: UserType,
       args: {
           user: { type: UserAttributesType },
       },
       resolve: (object, {user}, ctx) => {
           return Models.User.create(user);
       }
    };

    const updateMutation = {
       type: UserType,
       args: {
           user: { type: UserAttributesType },
           id: { type: new GraphQLNonNull(GraphQLInt) }
       },
        resolve: async (object, { user, id }) => {
           let record = await Models.User.findById(id);
           if (record) {
               return record.update(user, { fields: ['name', 'password'] });
           } else {
               throw Error("找不到用户");
          }
       }
    };

    const destroyMutation = {
       type: OperateStatusType,
       args: {
           id: { type: new GraphQLNonNull(GraphQLInt) },
       },
       resolve: async (object, {id}) => {
           let record = await Models.User.findById(id);
           if (record) {
               return record.destroy().then(res => {
                   return { success: res }
               });
           } else {
              throw Error("找不到用户");
           }
       }
    };


    const UserMutation = {
        create: createMutation,
        update: updateMutation,
        destroy: destroyMutation,
    }
    return UserMutation;
}
