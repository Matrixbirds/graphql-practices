'use strict';

const {CountryScalarType} = require('../scalars');

module.exports = ({
    GraphQLInterfaceType,
    GraphQLNonNull,
    GraphQLString,
}) => {
    const UserProfileInterface = new GraphQLInterfaceType({
        name: 'UserProfileInterface',
        fields: {
            name: GraphQLString,
            birthday: GraphQLString,
            country: CountryScalarType,
        }
    })
    return {
        default: UserProfileInterface,
    }
}
