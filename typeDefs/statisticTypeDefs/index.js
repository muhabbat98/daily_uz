const { gql } = require( 'apollo-server-express' );

const typeDefs = gql`

  extend type Query {
      monthlyExpenses(month:Int):[MonthExpense]
  }
  type MonthExpense{
    id:Int,
    name:String,
    sum:String
  }
`;
module.exports = {
     typeDefs
 }