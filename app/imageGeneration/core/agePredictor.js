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
        const descriptionTrans = 'Age Predictor';
        const transactionEntry = await authDao.transaction_insert(userid, descriptionTrans, -10);
        if (!transactionEntry || transactionEntry.rowCount === 0) {
            return new ResponseModal()
                .setStatus('error')
                .setStatusCode(400)
                .setMessage('transaction failed');
        }
        const totalCredits = await authDao.totalCredits(userid);
        if (!totalCredits || totalCredits.rowCount === 0) {
            return new ResponseModal()
                .setStatus('error')
                .setStatusCode(400)
                .setMessage('credits fetch failed');
        }
        return new ResponseModal()
            .setStatus("success")
            .setStatusCode(200)
            .setMessage("Age prediction recorded successfully")
            .setData({
                agepredic: Predict_age,
                file: uploadimage,
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