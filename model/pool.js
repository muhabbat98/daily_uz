const { Pool } = require('pg')
const connectionString = process.env.DATABASE_URL || 'postgres://ozqwzsfm:ZkgDrOmfCWp91Gopb7PE86rjeH4iAC06@satao.db.elephantsql.com/ozqwzsfm'

const pool = new Pool({
  connectionString,
} )

const ModuleArr = async (SQL, ...params) =>
{
    const client = await pool.connect()
    try
    {
        const { rows } = !params.length ? await client.query( SQL ) : await client.query( SQL, params )
        return rows
    }
    finally
    {
        client.release()
    }
}

const ModuleSingle = async (SQL, ...params) =>
{
    const client = await pool.connect()
    try
    {
        console.log("params ", params)
        
        const { rows: [ single ] } = params.length ? await client.query( SQL , params) : await client.query( SQL)
        return single
    }
    finally
    {
        client.release()
    }
}

module.exports = {
    ModuleArr,
    ModuleSingle
}