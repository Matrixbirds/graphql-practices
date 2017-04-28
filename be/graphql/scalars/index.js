'use strict';

const Scalars = {};

const graphql = require('graphql');

const formatDate = odd => (odd.toISOString());
const parseToDate = odd => (new Date(odd));

Object.defineProperty(Scalars, 'DateScalar', {
    enumerable: true,
    value: new graphql.GraphQLScalarType({
        name: 'DateScalar',
        descriptioN: 'handle date format',
        serialize: formatDate,
        parseValue: parseToDate,
        parseLiteral: odd => {
            if (!odd) throw Error("invalid date foramt");
        }
    })
})

Object.defineProperty(Scalars, 'CountryScalar', {
    enumerable: true,
    value: new graphql.GraphQLEnumType({
        name: 'CountryEnum',
        values: {
            CHINA: { value: 'CHINA' },
            JAPAN: { value: 'JAPAN' },
        }
    })
});

module.exports = Scalars;
