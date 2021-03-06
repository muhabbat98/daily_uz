const { gql } = require( 'apollo-server-express' );

const typeDefs = gql`
  scalar Upload
  extend type Query {
      expenses:[Expense!]!
      expenseItems(id:Int): [ExpenseItem]
  }
  type Image {
    id:String!
    filename: String!     
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
      addExpense(name:String, image:Int, userId:Int):Expense
      addExpenseItem(expenseId:Int,item:String, cost:Int, date:String):ExpenseItem
      imageUpload(file:Upload):Image
      deleteExpense(expenseId:Int):Expense
      deleteExpenseItem(itemId:Int):ExpenseItem
  }
`;
module.exports = {
     typeDefs
 }