'use strict';

module.exports = function({
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList
}) {

    const entityProperty = (itemType, model) => ({
        type: itemType,
        args: {
            id: { type: GraphQLInt },
        },
        resolve: (root, {id}) => (
            model.findById(id)
        )
    });

    return entityProperty;
}
