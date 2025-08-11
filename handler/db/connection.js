let { Pool } = require('pg')
let config = require('../config/database').database.local
const pool = new Pool(config);

var query = async function (query, args){
    const res = await pool.query(query, args)
    return res
}

module.exports = {
    query
}