const { gql } = require( 'apollo-server-express' );

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
      addUser(username:String, password:String):String
      deleteUser(userId:Int):String
  }
`;
module.exports = {
     typeDefs
 }