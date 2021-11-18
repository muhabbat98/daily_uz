const { ModuleSingle, ModuleArr } = require( '../model/pool' )

const CREATE_EXPENSE = "INSERT INTO expense(expense_name, image_id) VALUES($1, $2)RETURNING *"
const CREATE_EXPENSE_ITEM = "INSERT INTO expense_item(expense_id, item_name, cost, buyed_at ) VALUES($1, $2, $3, $4)RETURNING *"

const EXPENSES = "SELECT * FROM expense NATURAL JOIN expense_item"
const EXPENSE_ITEMS = "SELECT * FROM expense_item"
const EXPENSE_ITEM = "SELECT * FROM expense_item WHERE expense_id=$1"


// const DELETE_USER = "DELETE FROM users WHERE user_id=$1"


const addExpense = ( username, password ) => ModuleSingle( CREATE_EXPENSE, username, password )
const addExpenseItem = ( username, password ) => ModuleSingle( CREATE_EXPENSE_ITEM, username, password )


const selectExpenses = () => ModuleArr( EXPENSES )
const selectExpenseItems = ( id ) => id ? ModuleArr( EXPENSE_ITEM ) : ModuleArr( EXPENSE_ITEMS )

// const deleteUser = ( id ) => ModuleSingle( DELETE_USER, id )



module.exports = {
    addExpense,
    addExpenseItem,
    selectExpenseItems,
    selectExpenses
}