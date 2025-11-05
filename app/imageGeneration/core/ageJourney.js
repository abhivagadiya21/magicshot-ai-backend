const ResponseModal = require('../../../handler/http/ResponseModal');
const handleUrl = require('../../../handler/config/url');
const getUploadUrl = require('../../../handler/config/uploadUrl');
const getGenrateUrl = require('../../../handler/config/genrate');
const { ValidationError } = require('../../../handler/http/error/ValidationError');
const { details, getConfigByStoreFolder } = require('../../../handler/config/config');
const authDao = require('./dao');
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const ageJourneyConfig = getConfigByStoreFolder("Age_Journey");

const ageJourney = async function (req, userid, selectAge) {
    try {
        let uploadedFile = req.files?.ageJourneyUpload?.[0];
        if (!uploadedFile) {
            throw new ValidationError('ageJourneyUpload file is required');
        }
        const baseURL = `${req.protocol}://${req.get("host")}`;
        const uploadsDir = path.join(__dirname, "../../../uploads");
        const { uploadUrl } = getUploadUrl(ageJourneyConfig.storeFolder, uploadsDir, baseURL, uploadedFile);
        const { genraterUrl } = getGenrateUrl(ageJourneyConfig.storeFolder, uploadsDir, baseURL, uploadedFile);

        const userCredit = req.user.credits;

        if (userCredit < -ageJourneyConfig.credit) {
            return new ResponseModal()
                .setStatus('error')
                .setStatusCode(403)
                .setMessage('Not enough credits');
        }

        const transactionEntry = await authDao.transaction_insert(userid, ageJourneyConfig.descriptionTrans, ageJourneyConfig.credit);
        const transactionId = transactionEntry.rows[0].id;

        await authDao.ageJourney_insert(userid, uploadUrl, selectAge, genraterUrl, transactionId);
        await authDao.totalCredits(userid, ageJourneyConfig.credit);

        return new ResponseModal()
            .setMessage('age journy change saved')
            .setData({
                file: genraterUrl,
                fileUrl: genraterUrl
            });
    } catch (error) {
        console.error('agejourney error:', error);
        return new ResponseModal()
            .setStatus('error')
            .setStatusCode(500)
            .setMessage('Server error');
    }
}
module.exports = {
    ageJourney
}