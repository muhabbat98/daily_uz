const { ApolloServer, gql } = require( 'apollo-server' );
const users = require("./users")
const PORT = process.env.PORT || 4000
const modules = [
  users
]
const server = new ApolloServer( {
  modules, context: ( { req } ) =>
  {
    console.log(req.headers)
    const token = req.headers.auth || ""
    return token
  }
} );
server.listen({port:PORT}).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});