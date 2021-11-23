const { gql } = require( 'apollo-server-express' );
const {GraphQLUpload} = require( 'graphql-upload' );
const typeDefs = gql`
  scalar Upload
  extend type Query {
      expenses:[Expense!]!
      expenseItems(id:Int): [ExpenseItem]
  }
  type Image {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  type Expense{
      id:Int!,
      name:String!
      image:String
      items:[ExpenseItem]
  }
   type ExpenseItem{
      id:Int!,
      item:String!
      cost:String
      date:String
  }
  extend type Mutation{
      addExpense(name:String, image:String):Expense
      addExpenseItem(item:String, cost:String, date:String):ExpenseItem
      imageUpload(file:Upload):Image
      deleteUser(userId:Int):String
  }
`;
module.exports = {
     typeDefs
 }