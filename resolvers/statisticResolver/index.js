
const { token, check } = require("../../settings/jwt");
const {monthlyExpenses} = require("../../model/statisticalModel")
const resolvers = {
  Query: {
    monthlyExpenses: async(_,{month}) =>{
      const expense = await monthlyExpenses()
      console.log(month, expense)
      return expense
    }
  },
  MonthExpense: {
    id:global=>console.log(global)
  }
};

module.exports = {
  resolvers,
};
