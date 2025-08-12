const pgsql = require('../../../../handler/db/connection')

const agePredictor = async function (user_id,upload_img ,generator_image,predict_age, transaction_id ,) {
    let query = `
        INSERT INTO "age_predictor" ( "user_id", "upload_img", "generator_image", "predict_age", "transaction_id")
        VALUES ($1, $2, $3, $4, $5)`
    let values = [ user_id, upload_img, generator_image, predict_age, transaction_id ];
    return await pgsql.query(query, values);
}


const changeHair_insert = async function (userid, uploadimg, gender, hairStyle, hairColor, genraterImg, transactionId, createdAT, updatedAT) {
    let query = ` INSERT INTO "change_hairstyle"
                  ( "user_id" , "gender" , "hair_style" , "hair_color" , "generator_img" , "transaction_id" , "created_at" , "updated_at" )
                  VALUES($1,$2,$3,$4,$5,$6,$7,$8)`
        ;
    let values = [userid, uploadimg, gender, hairStyle, hairColor, genraterImg, transactionId, createdAT, updatedAT];
    return await pgsql.query(query, values);
};



module.exports = {
    agePredictor,
    changeHair_insert,
}