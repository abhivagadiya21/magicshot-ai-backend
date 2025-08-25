const pgsql = require('../../../../handler/db/connection');

const changeHair_insert = async function (
  userid,
  uploadimage,
  gender,
  hairStyle,
  hairColor,
  genraterImg,
  transactionId
) {
  const query = `
    INSERT INTO "change_hairstyle"
      ("user_id", "upload_img", "gender", "hair_style", "hair_color",
       "generator_img", "transaction_id" )
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *;
  `;
  const values = [
    userid,
    uploadimage,
    gender,
    hairStyle,
    hairColor,
    genraterImg,
    transactionId
  ];
  return await pgsql.query(query, values);
};

const agePredictor_insert = async function (
  userid,
  uploadimage,
  Predict_age,
  transactionId
) {
  const query = `
    INSERT INTO "age_predictor"
      ("user_id", "upload_img", Predict_age, "transaction_id")
    VALUES ($1,$2,$3,$4)
    RETURNING *;
  `;
  const values = [
    userid,
    uploadimage,
    Predict_age,
    transactionId
  ];
  return await pgsql.query(query, values);
};

const ageJourney_insert = async function (userid, uploadimage, selectAge, genraterImg, transactionId) {
  const query = `
    INSERT INTO "age_journey"
      ("user_id", "upload_img", "select_age", "generator_img", "transaction_id")
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *;
  `;
  const values = [userid, uploadimage, selectAge, genraterImg, transactionId];
  return await pgsql.query(query, values);
};

const babygenerator_insert = async function (userid, parent1, parent2, gender, genraterImg, transactionId) {
  const query = `
    INSERT INTO "baby_generation"
    ("user_id","parent_1","parent_2","gender","generator_image","transaction_id")
    VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING *`;
  const values = [userid, parent1, parent2, gender, genraterImg, transactionId];
  return await pgsql.query(query, values);
}

const transaction_insert = async (userId, description, credits) => {
  let query = `
        INSERT INTO "transactions" ("user_id", "type_cast", "credits")
        VALUES ($1, $2, $3)
        RETURNING *
    `;
  let values = [userId, description, credits];
  return await pgsql.query(query, values);
}
const totalCredits = async (userId) => {
  let query = `update "usersregister" set "credit" =  "credit" - 10 where "id" = $1 returning *`;
  let values = [userId];
  return await pgsql.query(query, values);
}
module.exports = {
  changeHair_insert,
  agePredictor_insert,
  babygenerator_insert,
  ageJourney_insert,
  transaction_insert,
  totalCredits
};
