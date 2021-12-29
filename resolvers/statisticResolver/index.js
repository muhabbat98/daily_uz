
const { token, check } = require("../../settings/jwt");
const {monthlyExpenses} = require("../../model/statisticalModel")
const resolvers = {
  Query: {
    monthlyExpenses: async(_,{month},{token}) =>{
      try{
        let user = check( token )
        console.log( user )
        const expense = await monthlyExpenses()
        console.log(month, expense, token)
        return expense
      }
      catch ( err )
      {
        console.log(err)
      }
      
    }
  },
  MonthExpense: {
    id: global => global.expense_id,
    name:global=>global.expense_name,
  }
};

module.exports = {
  resolvers,
};
