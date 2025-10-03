const pgsql = require('../../../../handler/db/connection')

const validateUser = async function (email) {
    let query = `select * from "usersregister" where "email" = $1`;
    let values = [email];
    return await pgsql.query(query, values);
}

const registerUser = async function (email, passwordHash,name) {
    let query = `
        INSERT INTO "usersregister" ( "email", "password","name")
        VALUES ($1, $2,$3)
        RETURNING "id", "email", "created_at"
    `;
    let values = [email, passwordHash,name];
    return await pgsql.query(query, values);
};

const addSignUpBouns = async (userId) => {
    let query = `update "usersregister" set "credit" =  100 where "id" = $1 returning *`;
    let values = [userId];
    return await pgsql.query(query, values);
};

const transaction_insert = async (userId, description, credits) => {
    let query = `
        INSERT INTO "transactions" ("user_id", "type_cast", "credits")
        VALUES ($1, $2, $3)
        RETURNING *
    `;
    let values = [userId, description, credits];
    return await pgsql.query(query, values);
};
const getcredit = async (userId) => {
  let query = `select * from "usersregister" where "id" = $1`;
  let values = [userId];
  return await pgsql.query(query, values);
}
const getTransactions = async (userId) => {
    let query = `select * from "transactions" where "user_id" = $1 order by "created_at" desc`;
    let values = [userId];
    return await pgsql.query(query, values);
}

module.exports = {
    validateUser,
    registerUser,
    addSignUpBouns,
    transaction_insert,
    getcredit,
    getTransactions
}