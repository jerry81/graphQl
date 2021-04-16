const express = require('express')
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express()
const port = 3001

app.get('/', (_, res) => {
    res.statusCode = 200
  res.send('Hello World!')
})

var schema = buildSchema(`
  type Query {
    hello: String
    quoteOfTheDay: String
    random: Float!
    roll(numDice: Int!, numSides: Int): [Int]
  }
`);
 
const rollDice = (sides) => {
    return Math.round(Math.random() * sides)
}
var root = { 
    hello: () => 'Hello world!' ,
    quoteOfTheDay: () => "In the evening of life, he spread his indulgent kindness over all and sundry",
    random: () => Math.round(Math.random() * 100),
    roll: ({numDice, numSides}) => Array(numDice).fill(0).map(() => rollDice(numSides))
};
 
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
  