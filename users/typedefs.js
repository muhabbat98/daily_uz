const { ApolloServer, gql } = require( 'apollo-server' );

const typeDefs = gql`
  type Query {
      users:[User!]!
  }
  type User{
      id:Int!,
      username:String!
      password:String
  }
  type Mutation{
      addUser(username:String, password:String):User
      deleteUser(userId:Int):String
  }
`;
module.exports = {
     typeDefs
 }