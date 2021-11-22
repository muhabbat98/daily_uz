const { gql } = require( 'apollo-server-core' );
const { typeDefs: expenseTypeDefs } = require( '../expenseTypeDefs' );
const {typeDefs:usersTypeDefs} = require('../usersTypeDefs')
module.exports =[
    expenseTypeDefs,
    usersTypeDefs
]

// module.exports = {

//     expenseTypeDefs,
//     usersTypeDefs
// }