const {addUser, selectUsers, deleteUser, isUser } = require("../../model/usersModel")
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
                const gen_token = token( res.user_id, res.username )
    
                return {username,token:gen_token}
              
            }
            catch ( err )
            {
                throw new Error("this username already taken")
            }
        },
        isUser: async (_, {username, password}) =>{
            try
            {
                const res = await isUser( username, password )
                if ( res&&res.username ){
                    return {
                        username,
                        token:token(res.user_id, res.username)
                    }
                }
                else
                {
                    throw new Error("this user is not registered in our webpage. please sign up ")
                }
            }
            catch ( err )
            {
                console.log( err )
                return err
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