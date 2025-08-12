const ResponseModal = require('../../../handler/http/ResponseModal')
const authDao = require('./dao')


const agePredictor = async function (user_id, upload_img, generator_image, predict_age, transaction_id) {
    try {
        let res = await authDao.agePredictor(user_id, upload_img, generator_image, predict_age, transaction_id);
        return new ResponseModal()
            .setStatus("success")
            .setStatusCode(201)
            .setData(res.rows[0])
            .setMessage("Age prediction recorded successfully");
    } catch (error) {
        return new ResponseModal()
            .setStatus("error")
            .setStatusCode(500)
            .setMessage("Failed to record age prediction: " + error.message);
    }
}


module.exports = {
    agePredictor
}