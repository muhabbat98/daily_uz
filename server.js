const { ApolloServer, gql } = require( 'apollo-server' );
const users = require("./users")
const PORT = process.env.PORT || 4000

const server = new ApolloServer(users);
server.listen({port:PORT}).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});