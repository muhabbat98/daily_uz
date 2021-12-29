const { ModuleSingle, ModuleArr } = require( '../../module/pool' );

const EXPENSE_MONTHLY = "select i.expense_id, SUM(i.cost), e.expense_name from expense_item i natural join expense e WHERE date_part('month',i.buyed_at) = date_part('month',current_date) AND e.user_id=$1 group by i.expense_id, e.expense_name;";

const monthlyExpenses = (userId) => ModuleArr( EXPENSE_MONTHLY, userId );

module.exports = {
    monthlyExpenses
}