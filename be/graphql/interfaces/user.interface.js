'use strict';

module.exports = ({
    GraphQLInterfaceType,
    GraphQLNonNull,
    GraphQLString,
}, {DateScalar, CountryScalar}) => {
    const UserProfileInterface = new GraphQLInterfaceType({
        name: 'UserProfileInterface',
        fields: {
            name: { type: GraphQLString },
            birthday: { type: DateScalar },
            country: { type: CountryScalar },
        },
    })
    return {
        default: UserProfileInterface,
    }
}
