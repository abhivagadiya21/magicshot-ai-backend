const pgsql = require('../../../../handler/db/connection')

const changeHair_insert = async function (userid, uploadimg, gender, hairStyle, hairColor, genraterImg, transactionId, createdAT, updatedAT) {
    let query = ` INSERT INTO "change_hairstyle"
                  ( "user_id" , "gender" , "hair_style" , "hair_color" , "generator_img" , "transaction_id" , "created_at" , "updated_at" )
                  VALUES($1,$2,$3,$4,$5,$6,$7,$8)`
        ;
    let values = [userid, uploadimg, gender, hairStyle, hairColor, genraterImg, transactionId, createdAT, updatedAT];
    return await pgsql.query(query, values);
};



module.exports = {
    changeHair_insert
}