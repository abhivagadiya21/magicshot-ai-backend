const ResponseModal = require('../../../handler/http/ResponseModal')
const authDao = require('./dao')


const agePredictor = async function (userid, uploadimage, Predict_age, genrater_Img, transactionId) {
    try {
        const result = await authDao.agePredictor_insert(userid, uploadimage, Predict_age, genrater_Img, transactionId);
        if (!result || result.rowCount === 0) {
            return new ResponseModal()
                .setStatus('error')
                .setStatusCode(400)
                .setMessage('Insert failed');
        }
        return new ResponseModal()
            .setStatus("success")
            .setStatusCode(200)
            .setMessage("Age prediction recorded successfully")
            .setData({
               agepredic: Predict_age,
               file:uploadimage,
            });
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