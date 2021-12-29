
const { token, check } = require("../../settings/jwt");

const resolvers = {
  Query: {
    monthlyExpenses: (_,{month}) =>{
      console.log(month)
      return []
    }
  },
  MonthExpense: {
    id:global=>console.log(global)
  }
};

module.exports = {
  resolvers,
};
