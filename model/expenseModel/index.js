const { ModuleSingle, ModuleArr } = require( '../../module/pool' )

const CREATE_EXPENSE = "INSERT INTO expense(expense_name, image_id) VALUES($1, $2)RETURNING *"
const CREATE_EXPENSE_ITEM = "INSERT INTO expense_item(expense_id, item_name, cost, buyed_at ) VALUES($1, $2, $3, $4)RETURNING *"
const CREATE_IMAGE ="INSERT INTO images(path) VALUES ($1) RETURNING *"

const EXPENSES = "SELECT * FROM expense e LEFT JOIN expense_item i ON e.expense_id= i.expense_id"
const EXPENSE_ITEMS = "SELECT * FROM expense_item"
const EXPENSE_ITEM = "SELECT * FROM expense_item WHERE expense_id=$1"



// const DELETE_USER = "DELETE FROM users WHERE user_id=$1"


const addExpense = ( name, id ) => ModuleSingle( CREATE_EXPENSE,name, id )
const addExpenseItem = ( expenseId, itemName, cost, buyedAt) => ModuleSingle( CREATE_EXPENSE_ITEM, expenseId, itemName, cost, buyedAt )
const createImage = (path)=>ModuleSingle(CREATE_IMAGE, path)

const selectExpenses = () => ModuleArr( EXPENSES )
const selectExpenseItems = ( id ) => id ? ModuleArr( EXPENSE_ITEM ) : ModuleArr( EXPENSE_ITEMS )

// const deleteUser = ( id ) => ModuleSingle( DELETE_USER, id )



module.exports = {
    addExpense,
    addExpenseItem,
    createImage,
    selectExpenseItems,
    selectExpenses
}