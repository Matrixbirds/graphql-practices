'use strict';

module.exports = function({
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
}) {
    const operateStatusProperty = new GraphQLObjectType({
        name: 'operator',
        fields: () => ({
            success: { type: GraphQLBoolean },
        }),
        resolve: (object) => {
            return object;
        }
    });
    return operateStatusProperty;
}
