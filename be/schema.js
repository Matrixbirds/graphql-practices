const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLDateTime
} = require('graphql');

const { user: User }= require('./models');


function getAllUsers() {
    return User
        .findAll({ offset: 0, limit: 5})
        .spread(_user => _user);
}

const PersonType = new GraphQLObjectType({
    name: 'Person',
    description: '...',

    fields: () => ({
        name: {
            type: GraphQLString,
            resolve: (person) => person.name,
        },
        id: {type: GraphQLString},
        created_at: {type: GraphQLString},
        updated_at: {type: GraphQLString}
    })
})

const QueryType = new GraphQLObjectType({
    name: 'Query',
    description: '...',

    fields: () => ({
        person: {
            type: PersonType,
            args: {
                id: {type: GraphQLString}
            },
            resolve: () => getAllUsers()
        }
    })
});
module.exports = new GraphQLSchema({
    query: QueryType,
});
