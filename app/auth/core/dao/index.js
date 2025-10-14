const pgsql = require('../../../../handler/db/connection')

const validateUser = async function (email) {
    let query = `select * from "usersregister" where "email" = $1`;
    let values = [email];
    return await pgsql.query(query, values);
}

const registerUser = async function (email, passwordHash, name) {
    let query = `
        INSERT INTO "usersregister" ( "email", "password","name")
        VALUES ($1, $2,$3)
        RETURNING "id", "email", "created_at"
    `;
    let values = [email, passwordHash, name];
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
const updatePassword = async (userId, newPasswordHash) => {
    let query = `update "usersregister" set "password" =  $2  where "id" = $1 returning *`;
    let values = [userId, newPasswordHash];
    return await pgsql.query(query, values);
}
const getTransactions = async (userId) => {
    let query = `select * from "transactions" where "user_id" = $1 order by "created_at" desc`;
    let values = [userId];
    return await pgsql.query(query, values);
}
// const updateProfile = async (userId,userName,bio,profileImg) => {
//     let query = `update "usersregister" set "username" =  $2, "bio" = $3 , "profileimage"=$4  where "id" = $1 returning *`;
//     let values = [userId,userName,bio,profileImg];
//     return await pgsql.query(query, values);
// }

const insertProfileInfo = async (userId, userName, bio) => {
    let query = `update "usersregister" set "username" =  $2, "bio" = $3  where "id" = $1 returning *`;
    let values = [userId, userName, bio];
    return await pgsql.query(query, values);
}

const insertProfileImage = async (userId, profileImg) => {
    let query = `update "usersregister" set "profileimage"=$2  where "id" = $1 returning *`;
    let values = [userId, profileImg];
    return await pgsql.query(query, values);
}

const imageHistory = async (userId) => {
    //     let query = `SELECT * FROM (
    //   SELECT 
    //     id,
    //     user_id,
    //     transaction_id,
    //     generator_img AS generator_img,
    // 	'baby_generation' AS record_type,
    //     created_at,
    //     jsonb_build_object(
    //         'parent_1', parent_1,
    //         'parent_2', parent_2,
    // 		'gender', gender
    //     ) AS metadata
    //   FROM baby_generation
    //   WHERE user_id = $1

    //   UNION ALL

    //   SELECT
    //     id,
    //     user_id,
    //     transaction_id,
    //     generator_img,
    //     'age_journey' AS record_type,
    //     created_at,
    //     jsonb_build_object(
    //         'select_age', select_age,
    //         'upload_img', upload_img
    //     ) AS metadata
    //   FROM age_journey
    //   WHERE user_id = $1
    // ) as all_data
    // ORDER BY created_at DESC;`;
    let query = `SELECT * FROM (
  SELECT	 
   ch.id,
    ch.user_id,
    ch.transaction_id,
    ch.generator_img AS generator_img,
	'change_hairstyle' AS record_type,
	t.credits AS use_credit,
    ch.created_at,
    jsonb_build_object(
        'upload_img', ch.upload_img,
        'hair_style', ch.hair_style,
		'hair_color',ch.hair_color,
		'gender', ch.gender
    ) AS metadata
  FROM change_hairstyle ch
  JOIN transactions t on ch.transaction_id = t.id
  WHERE ch.user_id = $1

  UNION ALL

  SELECT	 
   ap.id,
    ap.user_id,
    ap.transaction_id,
    ap.upload_img AS generator_img,
	'age_predictor' AS record_type,
	t.credits AS use_credit,
    ap.created_at,
    jsonb_build_object(
        'upload_img', ap.upload_img,
        'predict_age', ap.predict_age
    ) AS metadata
  FROM age_predictor ap
  JOIN transactions t on ap.transaction_id = t.id
  WHERE ap.user_id = $1

  UNION ALL
  
  SELECT 
    bg.id,
    bg.user_id,
    bg.transaction_id,
    bg.generator_img AS generator_img,
	'baby_generation' AS record_type,
	t.credits AS use_credit,
    bg.created_at,
    jsonb_build_object(
        'parent_1', bg.parent_1,
        'parent_2', bg.parent_2,
		'gender', bg.gender
    ) AS metadata
  FROM baby_generation bg
  JOIN transactions t on bg.transaction_id = t.id
  WHERE bg.user_id = $1

  UNION ALL

  SELECT
    aj.id,
    aj.user_id,
    aj.transaction_id,
    aj.generator_img,
    'age_journey' AS record_type,
	t.credits AS use_credit,
    aj.created_at,
    jsonb_build_object(
        'select_age', aj.select_age,
        'upload_img', aj.upload_img
    ) AS metadata
  FROM age_journey aj
  JOIN transactions t on aj.transaction_id = t.id
  WHERE aj.user_id = $1
) as all_data
ORDER BY created_at DESC;`;
    let values = [userId];
    return await pgsql.query(query, values);
}

module.exports = {
    validateUser,
    registerUser,
    addSignUpBouns,
    transaction_insert,
    getcredit,
    getTransactions,
    // updateProfile,
    insertProfileImage,
    insertProfileInfo,
    imageHistory,
    updatePassword
}