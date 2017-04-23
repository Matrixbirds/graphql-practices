```cURL
   curl --request POST \
     --url http://localhost:3000/graphql \
     --header 'cache-control: no-cache' \
     --header 'content-type: application/json' \
     --header 'postman-token: 00213ac3-82e1-1505-0ee5-68b8cc7a6607' \
     --data '{  "query": "mutation($title: String $content: String) { createArticle(title: $title, content: $content) { id content title } }", 	"variables": { 		"content": "jaslkdfjkljasldfjkljsakldjfljklsajdklfj",  "title": "你好"  } }'
   
   curl --request POST \
     --url http://localhost:3000/graphql \
     --header 'cache-control: no-cache' \
     --header 'content-type: application/json' \
     --header 'postman-token: 6f6de6d1-e11e-22c4-2685-84227fb74bfc' \
     --data '{ 	"query": "mutation($title: String $content: String) { createComment(title: $title, content: $content) { id content title } }", 	"variables": { 		"content": "jaslkdfjkljasldfjkljsakldjfljklsajdklfj", 		"title": "你好" 	} }'
   
   
   curl --request POST \
     --url http://localhost:3000/graphql \
     --header 'cache-control: no-cache' \
     --header 'content-type: application/json' \
     --header 'postman-token: 71b86b80-2580-3d28-4a5e-ff51d466cf23' \
     --data '{ 	"query": "mutation($name: String $password: String) { createUser(name: $name, password: $password) { id name token } }", 	"variables": { 		"name": "jaslkdfjkljasldfjkljsakldjfljklsajdklfj", 		"password": "123123123" 	} }'
```
