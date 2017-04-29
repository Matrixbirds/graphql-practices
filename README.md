
# requirements
  * `bcrypt` dependence python2 command take care and confim dev environment installed python2 and must be named `python2`

# My toolkit
 * repl console
 ```bash
 # enter console with orm context
 ./bin/cli
 ```
 * graphql code snippet generator
 ```bash
 ./bin/graphql type comment --attrs id:GraphQLInteger title:GraphQLString content:GraphQLString
 ./bin/graphql mutation article --attrs id:GraphQLInteger title:GraphQLString content:GraphQLString -m create update destroy
 ```

# [schema.graphql](https://github.com/Matrixbirds/GraphQL-demo-blog/blob/master/doc/schema.graphql)

# Query Example
 ```bashscript
 curl -i -H "Content-Type: application/json" -X POST \
 -d '{"query": "query GRAPHQL_PAYLOAD"}' \
  http://localhost:3000/graphql
 ```

# Mutation Example
 ```cURL
 curl --request POST \
  --url http://localhost:3000/graphql \
  --header 'content-type: application/json' \
 -d '{"query": "mutation(input: GRAPHQL_INPUT!) GRAPHQL_PAYLOAD", "variables": "VARIABLES"}' \
 ```
