
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

# Query Example
 ```bashscript
 curl -i -H "Content-Type: application/json" -X POST \
 -d '{"query": "{ users: users(page:1 per:5) { data {id name} meta { totalPage } } }"}' \
  http://localhost:3000/graphql
 ```

 ```json
   {
      "data": {
          "users": {
              "data": [
                  {
                      "id": "1",
                      "name": "123"
                  },
                  {
                      "id": "2",
                      "name": "123"
                  },
                  {
                      "id": "3",
                      "name": "fuck"
                  }
              ],
              "meta": null
          }
      }
   }
 ```

# Query Mutation Example
 ```cURL
 curl --request POST \
  --url http://localhost:3000/graphql \
  --header 'cache-control: no-cache' \
  --header 'content-type: application/json' \
  --header 'postman-token: 04b4e3ca-a3c3-f25d-bc3d-57725666d06d' \
  --data '{\n	"query": "mutation($name: String $password: String) { createUser(name: $name, password: $password) { id name } }",\n	"variables": {\n		"name": "123123123",\n		"password": "123123123"\n	}\n}'
 ```

 ```json
 {
     "data": {
         "createUser": {
             "id": "4",
             "name": "123123123"
         }
     }
 }
 ```
