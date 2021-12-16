const { ModuleSingle, ModuleArr } = require( '../../module/pool' )

const CREATE_USER = "INSERT INTO users(username, password) VALUES($1, crypt($2,gen_salt('bf')))RETURNING user_id, username"
const USERS = "SELECT username, user_id FROM users"
const DELETE_USER = "DELETE FROM users WHERE user_id=$1"
const IS_USER = "SELECT * FROM users WHERE username=$1 AND password = crypt($2,password)"

const addUser = (username, password) => ModuleSingle( CREATE_USER, username, password )
const selectUsers = () => ModuleArr( USERS )
const deleteUser = ( id ) => ModuleSingle( DELETE_USER, id )
const isUser =(username, password) => ModuleSingle(IS_USER, username, password)


module.exports = {
    addUser,
    selectUsers,
    deleteUser,
    isUser
}