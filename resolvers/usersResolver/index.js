const {addUser, selectUsers, deleteUser, isUser } = require("../../model/usersModel")
const { token, check } = require( "../../settings/jwt" )

const {AlreadyExist, NotExist} = require('../../errorHandler')
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
                throw new AlreadyExist
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
                    throw new NotExist
                }
            }
            catch ( err )
            {
                throw new NotExist
           
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