const { ModuleSingle, ModuleArr } = require( '../model/pool' )

const CREATE_USER = "INSERT INTO users(username, password) VALUES($1, crypt($2,gen_salt('bf')))RETURNING user_id, username"
const USERS = "SELECT username, user_id FROM users"
const DELETE_USER = "DELETE FROM users WHERE user_id=$1"


const addUser = (username, password) => ModuleSingle( CREATE_USER, username, password )
const selectUsers = () => ModuleArr( USERS )
const deleteUser = ( id ) => ModuleSingle( DELETE_USER, id )



module.exports = {
    addUser,
    selectUsers,
    deleteUser
}