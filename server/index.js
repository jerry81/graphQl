const express = require('express')
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express()
const port = 3001

app.get('/', (req, res) => {
    res.statusCode = 200
  res.send('Hello World!')
})

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);
 
var root = { hello: () => 'Hello world!' };
 
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
  