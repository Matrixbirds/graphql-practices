'use strict';

module.exports = ({
    GraphQLInterfaceType,
    GraphQLID,
    GraphQLNonNull,
}) => {
    const Node = new GraphQLInterfaceType({
        name: 'Node',
        fields: {
            id: { type: new GraphQLNonNull(GraphQLID) }
        }
    });
    return {
        default: Node
    };
}
