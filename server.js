
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const typeDefs = require('./src/graphqlSchemas');
const resolvers = require('./src/resolvers');
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
// const { startStandaloneServer } = require('@apollo/server/standalone')
const { graphqlUploadExpress } = require('graphql-upload-minimal');

const { initDatabase } = require("./db/index");
initDatabase();

app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))
app.use(express.static(require('path').join(__dirname, 'public')));
const PORT = process.env.PORT || 3000;

async function startServer(){

const server = new ApolloServer({ typeDefs, resolvers })

////////////////////////// startStandaloneServer ///////////////////////////
// const { url } = await startStandaloneServer(server, {
//   context: async ({ req, res }) => {
//     // Get the user token from the headers.
//     const token = req.headers.authorization || '';
//     return { token, req };
//   },
// });
//  console.log(`🚀 Server listening at: ${url}`);

///////////////////////////////////////////////////////////////////////////
// 
await server.start()
app.use('/graphql', cors(),
bodyParser.json({ limit: '50mb' }),
expressMiddleware(server, {
  context: async ({ req }) => { 
    const token = req.headers.authorization;
    return { token, req };
   }
}),
).listen(PORT)
//////////////////////////////////////////////////////////////////////////

}

// start apllo server
startServer()
