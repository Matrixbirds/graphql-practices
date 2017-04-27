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

    const {query: UserType, authInput: authInputType} = Types.UserType;

    const signUpMutation = {
        type: UserType,
        args: {
            input: {type: new GraphQLNonNull(authInputType)},
        },
        resolve: (_, {input}) => {
            return Models.User.create(input)
        }
    };

    const signInMutation = {
        type: UserType,
        args: {
            input: {type: new GraphQLNonNull(authInputType)},
        },
        resolve: (_, {input}) => (
            Models.User.authentication(input)
        )
    };

    const UserMutation = {
        signUp: signUpMutation,
        signIn: signInMutation,
    }
    return UserMutation;
}
