const {selectExpenses, selectExpenseItems} = require("./module")
const {token, check} = require("../settings/jwt")
const resolvers = {
  
    Query: {
        expenses: () => selectExpenses(),
        expenseItems:()=>selectExpenseItems()
    },
    Expense: {
        id: expense => expense.expense_id,
        name: expense => expense.expense_name,
        image: expense => expense.image_id,
        items: expense => selectExpenseItems(expense.expense_id)
    },
    ExpenseItem: {
        id: item => item.expense_item_id,
        item: item => item.item_name,
        cost: item => item.cost,
        date: item => item.buyed_at
    },
   
    Mutation: {
     
        addExpense: async(_, {name, image},token)=> {
           console.log(token, name, image)
        },
        deleteUser: async(id) =>
        {
            
        }
    }
};

module.exports = {
    resolvers
}