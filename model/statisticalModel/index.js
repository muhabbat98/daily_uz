const { ModuleSingle, ModuleArr } = require( '../../module/pool' );

const EXPENSE_MONTHLY = "select e.expense_id, e.expense_name, e.expense_id,  ARRAY(select CONCAT('{over_all:',SUM(i.cost),',items:',Array(select '{name:'||i.item_name||' cost:'||i.cost||' buyed_at:'||i.buyed_at||'}' from expense_item i where e.expense_id=i.expense_id) ,'}') from expense_item i where e.expense_id=i.expense_id GROUP BY i.expense_id, e.expense_id) from expense e Where e.user_id = $1";

const filteredExpenses = (userId) => ModuleArr( EXPENSE_MONTHLY, userId );

module.exports = {
    filteredExpenses
}