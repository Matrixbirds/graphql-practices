const {
    GraphQLSchema,
} = require('graphql');

module.exports = new GraphQLSchema({
    query: require('./types'),
});
