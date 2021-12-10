import { createError } from "apollo-errors";

export const AlreadyExist = createError( "AlreadyExist", { message: 'this username is already taken. Please choose another one or log in' } );

export const NotExist = createError("NotExist", {message:'this user is not registered in our webpage. please sign up'})
