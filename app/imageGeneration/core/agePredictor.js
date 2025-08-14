const ResponseModal = require('../../../handler/http/ResponseModal')
const authDao = require('./dao')


const agePredictor = async function (userid, uploadimage, Predict_age, genrater_Img, transactionId)
 {
    try {
        let res = await authDao.agePredictor_insert(userid, uploadimage, Predict_age, genrater_Img, transactionId);
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