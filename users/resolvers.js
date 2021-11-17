const {addUser, selectUsers, deleteUser } = require("./module")

const resolvers = {
  
    Query: {
        users: () => selectUsers(),
        User: {
            id: ( user ) => user.user_id
        },
    },
    Mutation: {
     
        addUser: async(_, {username, password})=> {
            const res = await addUser( username, password )
            console.log(res)
        },
        deleteUser: async(id) =>
        {
            const res = await deleteUser( id )
            console.log(res)
        }
    }
};

module.exports = {
    resolvers
}