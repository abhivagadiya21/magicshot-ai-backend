const ResponseModal = require('../../../handler/http/ResponseModal')
const authDao = require('./dao')
const getUploadUrl = require('../../../handler/config/uploadUrl');
const { ValidationError } = require('../../../handler/http/error/ValidationError');
const getGenrateUrl = require('../../../handler/config/genrate');
const { details, getConfigByStoreFolder } = require('../../../handler/config/config');
const path = require("path");
const agePredictorConfig = getConfigByStoreFolder("Age_Predictor");

const agePredictor = async function (req, userid, Predict_age) {
    try {
        let uploadFile = req.files?.agePredictorUpload?.[0];
        if (!uploadFile) {
            throw new ValidationError('agePredictorUpload file is required');
        }
        const baseURL = `${req.protocol}://${req.get("host")}`;
        const uploadsDir = path.join(__dirname, "../../../uploads");
        const { uploadUrl } = getUploadUrl(agePredictorConfig.storeFolder, uploadsDir, baseURL, uploadFile);

        const userCredit = req.user.credits;
        if (userCredit < agePredictorConfig.credit) {
            return new ResponseModal()
                .setStatus('error')
                .setStatusCode(403)
                .setMessage('Not enough credits');
        }
        const transactionEntry = await authDao.transaction_insert(userid, agePredictorConfig.descriptionTrans, agePredictorConfig.credit);
        const transactionId = transactionEntry.rows[0].id;
        await authDao.agePredictor_insert(userid, uploadUrl, Predict_age, transactionId);
        await authDao.totalCredits(userid, agePredictorConfig.credit);

        return new ResponseModal()
            .setStatus("success")
            .setStatusCode(200)
            .setMessage("Age prediction recorded successfully")
            .setData({
                agepredic: Predict_age,
                file: uploadUrl,
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