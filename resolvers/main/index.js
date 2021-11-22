const { resolvers: userResolvers } = require( '../usersResolver' );
const {resolvers:expenseResolvers} =require('../expenseResolver')
module.exports = [
    userResolvers,
    expenseResolvers
]