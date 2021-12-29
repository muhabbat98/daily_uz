
const { token, check } = require("../../settings/jwt");
const {monthlyExpenses} = require("../../model/statisticalModel")
const resolvers = {
  Query: {
    monthlyExpenses: async(_,{month},{token}) =>{
      const expense = await monthlyExpenses()
      console.log(month, expense, token)
      return expense
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
