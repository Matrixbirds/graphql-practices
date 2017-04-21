
# My toolkit
 * repl console
 ```bash
 # enter console with orm context
 ./bin/cli
 ```
 * graphql code snippet generator
 ```bash
 ./bin/graphql types -n comment --attrs id:GraphQLInteger title:GraphQLString content:GraphQLString
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

