const graphql = require('graphql');

module.exports = new graphql.GraphQLSchema({
    query: require('./types').QueryType(graphql),
    mutation: require('./mutations').Mutation(graphql)
});
