const { gql } = require( 'apollo-server-express' );

const typeDefs = gql`
scalar Token
 type Query {
      users:[User!]!
  }
  type User{
      id:Int!,
      username:String!
      password:String
  }
  type Mutation{
      addUser(username:String, password:String):Token
      deleteUser(userId:Int):String
      isUser(username:String, password:String):Token
  }
`;
module.exports = {
     typeDefs
 }