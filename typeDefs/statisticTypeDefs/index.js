const { gql } = require( 'apollo-server-express' );

const typeDefs = gql`

  extend type Query {
      yearlyExpenses(year:Int):[YearExpense]
  }
  type YearExpense{
    id:Int,
    name:String
    expenses:[MonthExpense]
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