
const { token, check } = require("../../settings/jwt");
const {filteredExpenses} = require("../../model/statisticalModel")
const resolvers = {
  Query: {
    yearlyExpenses: async(_,{year},{token}) =>{
      try{
        let user = check( token )        
        const expense = await filteredExpenses(user.id)
        console.log(year, expense, token)
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
