const pgsql = require('../../../../handler/db/connection')

const validateUser = async function (email) {
    let query = `select * from "usersregister" where "email" = $1`;
    let values = [email];
    return await pgsql.query(query, values);
}

const registerUser = async function (email, passwordHash) {
    let query = `
        INSERT INTO "usersregister" ( "email", "password")
        VALUES ($1, $2)
        RETURNING "id", "email", "created_at"
    `;
    let values = [email, passwordHash];
    return await pgsql.query(query, values);
};


module.exports = {
    validateUser,
    registerUser
}