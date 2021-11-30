const express = require( 'express' );

const { ApolloServer } = require( 'apollo-server-express' );

const {
  GraphQLUpload,
  graphqlUploadExpress,
  Upload
} = require( 'graphql-upload' );

const typeDefs = require( './typeDefs/main' )
const resolvers = require('./resolvers/main')


const PORT = process.env.PORT || 4000


async function startServer() {
  const server = new ApolloServer({
   
    typeDefs: typeDefs,
    resolvers:resolvers,
    context: ( { req } ) =>
    {
        console.log("SERVER TOKEN",req.headers.token)
        const token = req.headers.token || ""
        return {token}
    },
    // uploads: false
  });

  await server.start();

  const app = express();

 
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

  server.applyMiddleware({ app, path:'/', cors:true });

  await new Promise(()=> app.listen({ port:PORT }));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
startServer();