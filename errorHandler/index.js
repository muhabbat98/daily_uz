const { createError } = require( "apollo-errors" );

const AlreadyExist = createError( "AlreadyExist", { message: 'this username is already taken. Please choose another one or log in' } );

const NotExist = createError("NotExist", {message:'this user is not registered in our webpage. please sign up'})

module.exports = {
    AlreadyExist,
    NotExist
}