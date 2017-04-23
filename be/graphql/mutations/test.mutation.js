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
       type: TestType.itemType,
       args: {
           id: { type:  GraphQLInt },
       },
       resolve: (object, args) => {
           return Models.Test.create(args);
       }
    };
    
    const updateMutation = {
       type: TestType.itemType,
       args: {
           id: { type:  GraphQLInt },
       },
       resolve: (object, args) => {
           return Models.Test.update(args);
       }
    };
    
    const destroyMutation = {
       type: TestType.itemType,
       args: {
           id: { type:  GraphQLInt },
       },
       resolve: (object, args) => {
           return Models.Test.destroy(args);
       }
    };
    

    const TestMutation = {
        create: createMutation,
        update: updateMutation,
        destroy: destroyMutation,
    }
    return TestMutation;
}
