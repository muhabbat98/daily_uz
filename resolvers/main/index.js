const { resolvers: userResolvers } = require( '../usersResolver' );
const { resolvers: expenseResolvers } = require( '../expenseResolver' )
const {resolvers:statisticalResolvers} = require('../statisticResolver')
module.exports = [
    userResolvers,
    expenseResolvers,
    statisticalResolvers
]