'use strict';

module.exports = ({
    GraphQLInterfaceType,
    GraphQLString
}) => {

    console.log(GraphQLInterfaceType);
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
