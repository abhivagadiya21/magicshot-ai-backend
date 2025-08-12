const pgsql = require('../../../../handler/db/connection')

const agePredictor = async function (user_id,upload_img ,generator_image,predict_age, transaction_id ,) {
    let query = `
        INSERT INTO "age_predictor" ( "user_id", "upload_img", "generator_image", "predict_age", "transaction_id")
        VALUES ($1, $2, $3, $4, $5)`
    let values = [ user_id, upload_img, generator_image, predict_age, transaction_id ];
    return await pgsql.query(query, values);
}



module.exports = {
    agePredictor
}