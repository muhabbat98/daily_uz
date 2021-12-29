const { gql } = require( 'apollo-server-core' );
const { typeDefs: expenseTypeDefs } = require( '../expenseTypeDefs' );
const { typeDefs: usersTypeDefs } = require( '../usersTypeDefs' )
const {typeDefs:statisticalTypeDefs} = require('../statisticTypeDefs')

module.exports =[
    expenseTypeDefs,
    usersTypeDefs,
    statisticalTypeDefs
]

// module.exports = {

//     expenseTypeDefs,
//     usersTypeDefs
// }