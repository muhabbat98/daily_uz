const { ModuleSingle, ModuleArr } = require( '../../module/pool' )

const CREATE_EXPENSE = "INSERT INTO expense(expense_name, image_id, user_id) VALUES($1, $2,$3)RETURNING *"
const CREATE_EXPENSE_ITEM = "INSERT INTO expense_item(expense_id, item_name, cost, buyed_at ) VALUES($1, $2, $3, $4)RETURNING *"
const CREATE_IMAGE ="INSERT INTO images(path) VALUES ($1) RETURNING *"

// const EXPENSES = "SELECT * FROM expense e LEFT JOIN expense_item i ON e.expense_id= i.expense_id"
const EXPENSES = "select * from expense e natural join images m  where  e.user_id=$1 "
const EXPENSE_ITEMS = "SELECT * FROM expense_item"
const EXPENSE_ITEM = "SELECT * FROM expense_item WHERE expense_id=$1"
const SELECT_IMAGE =  "SELECT path FROM images WHERE image_id=$1"

// const DELETE_USER = "DELETE FROM users WHERE user_id=$1"
const DELETE_EXPENSE = "DELETE FROM expense WHERE expense_id=$1 RETURNING *"
const DELETE_EXPENSE_ITEM = "DELETE FROM expense_item WHERE expense_id=$1 RETURNING *"
const DELETE_ITEM = "DELETE FROM expense_item WHERE expense_item_id=$1 RETURNING *"



const addExpense =              ( name, id, userId )                        => ModuleSingle( CREATE_EXPENSE,name, id, userId )
const addExpenseItem =          ( expenseId, itemName, cost, buyedAt)       => ModuleSingle( CREATE_EXPENSE_ITEM, expenseId, itemName, cost, buyedAt )
const createImage =             (path)                                      =>ModuleSingle(CREATE_IMAGE, path)

const selectExpenses =          (id)                                        => ModuleArr( EXPENSES, id )
const selectExpenseItems =      ( id )                                      => id ? ModuleArr( EXPENSE_ITEM, id ) : ModuleArr( EXPENSE_ITEMS )
const selectImage =             (id)                                        => ModuleSingle(SELECT_IMAGE, id)
// const deleteUser = ( id ) => ModuleSingle( DELETE_USER, id )

const deleteExpenseHandler =    (id)                                        => ModuleSingle(DELETE_EXPENSE, id)
const deleteItemWithExpense =   (id)                                        => ModuleSingle(DELETE_EXPENSE_ITEM, id)
const deleteItemWithId=         (id)                                        => ModuleSingle(DELETE_ITEM, id)

module.exports = {
    addExpense,
    addExpenseItem,
    createImage,
    selectExpenseItems,
    selectExpenses,
    selectImage,
    deleteExpenseHandler,
    deleteItemWithExpense,
    deleteItemWithId
}