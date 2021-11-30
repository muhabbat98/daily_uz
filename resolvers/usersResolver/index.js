const {addUser, selectUsers, deleteUser } = require("../../model/usersModel")
const {token, check} = require("../../settings/jwt")
const resolvers = {
  
    Query: {
        users: () => selectUsers(),
    },
    User: {
            id: ( user ) => user.user_id
    },
    Mutation: {
     
        addUser: async(_, {username, password})=> {
            try
            {
                const res = await addUser( username, password )
                const gen_token = token( res.username )
    
                return {token:gen_token}
              
            }
            catch ( err )
            {
                throw new Error("this username already taken")
            }
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