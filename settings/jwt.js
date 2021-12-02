const { sign, verify } = require( "jsonwebtoken" );
const SECKRET_KEY = "123bmp98"
const token = ( id, username ) => sign( { id,username }, SECKRET_KEY );
const check = ( token ) => verify( token, SECKRET_KEY );

module.exports = {
    token,
    check
}