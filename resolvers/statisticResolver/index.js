
const { token, check } = require("../../settings/jwt");
const {filteredExpenses} = require("../../model/statisticalModel")
const resolvers = {
  Query: {
    yearlyExpenses: async(_,{year},{token}) =>{
      try{
        let user = check( token )        
        const expense = await filteredExpenses(user.id, year)
        return expense
      }
      catch ( err )
      {
        console.log(err)
      }
      
    }
  },
  YearExpense: {
    id: global => global.expense_id,
    name: global => global.expense_name,
    expenses:global=>global.array
  },
  MonthExpense: {
    id:global=>console.log(global)
  }
 
};

module.exports = {
  resolvers,
};
