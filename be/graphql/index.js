const graphql = require('graphql');

module.exports = new graphql.GraphQLSchema({
    query: require('./types').Query,
    mutation: require('./mutations').Mutation
});
