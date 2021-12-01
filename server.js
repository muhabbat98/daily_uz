const express = require( 'express' );
const path = require('path')
const { ApolloServer } = require( 'apollo-server-express' );
const cors = require('cors')
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
    context: ( { req } ) =>({token:req.headers.token || ""})
    // uploads: false
  });

  await server.start();

  const app = express();

  app.use('/images', express.static(path.join(__dirname, "/images")));
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
  app.use(cors())
  server.applyMiddleware({ app, path:'/app', cors:true });
  
  await new Promise(()=> app.listen({ port:PORT }));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
startServer();