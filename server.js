const express = require('express');
const { ApolloServer } = require( 'apollo-server-express' );
const {
  GraphQLUpload,
  graphqlUploadExpress, // A Koa implementation is also exported.
} = require('graphql-upload');
// const { promises } = require( 'stream' );

const users = require( "./users" )
const expense = require("./expense")

const PORT = process.env.PORT || 4000

const modules = [
  users,
  expense
]

async function startServer() {
  const server = new ApolloServer({
    modules,
    context: ( { req } ) =>
      {
        console.log(req.headers)
        const token = req.headers.auth || ""
        return token
      }
  });

  await server.start();

  const app = express();

  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });

  await new Promise(()=> app.listen({ port: 4000 }));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
startServer();