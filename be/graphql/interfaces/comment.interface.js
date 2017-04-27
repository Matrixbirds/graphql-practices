'use strict';

module.exports = ({
    GraphQLInterfaceType,
    GraphQLString
}) => {
    const CommentInterface = new GraphQLInterfaceType({
        name: 'commentInterface',
        fields: {
            title: GraphQLString,
            content: GraphQLString,
        }
    });

    return {
        default: CommentInterface,
    };
}
