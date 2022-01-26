const { gql } = require( 'apollo-server-express' );

const typeDefs = gql`

  extend type Query {
      yearlyExpenses(year:Int):[YearExpense]
  }
  type YearExpense{
    id:int,
    month:String
    expenses:[monthlyExpenses]
  }
  type MonthExpense{
    id:Int,
    name:String,
    overAll:String,
  }
`;
module.exports = {
     typeDefs
 }