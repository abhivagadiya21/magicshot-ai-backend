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
    [gender],
    [hairStyle],
    [hairColor],
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

const age_journey = async function (userid, uploadimage, select_age, genrater_Img, transactionId) {
  const query = `
    INSERT INTO "age_journey"
      ("user_id", "upload_img", "select_age", "genrater_img", "transaction_id")
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *;
  `;
  const values = [
    userid,
    uploadimage,
    select_age,
    genrater_Img,
    transactionId
  ];
  return await pgsql.query(query, values);
};

module.exports = {
  changeHair_insert,
  agePredictor_insert,
  age_journey
};
