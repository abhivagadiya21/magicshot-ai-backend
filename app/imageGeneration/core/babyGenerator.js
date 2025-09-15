const ResponseModal = require('../../../handler/http/ResponseModal');
const { details, getConfigByStoreFolder } = require('../../../handler/config/config');
const authDao = require('./dao');
const { ValidationError } = require('../../../handler/http/error/ValidationError');
const path = require("path");
const getUploadUrl = require('../../../handler/config/uploadUrl');
const getGenrateUrl = require('../../../handler/config/genrate');
const babyGeneratorConfig = getConfigByStoreFolder("Baby_Genrater");

const babyGenerator = async function (req, userid, gender) {
    try {
        let uploadParent1 = req.files?.parent1?.[0];
        let uploadParent2 = req.files?.parent2?.[0];
        if (!uploadParent1 && !uploadParent2) {
            throw new ValidationError('parent1 or parent2 file is required');
        }
        const baseURL = `${req.protocol}://${req.get("host")}`;
        const uploadsDir = path.join(__dirname, "../../../uploads");
        const { uploadUrl: parent1Url } = getUploadUrl(babyGeneratorConfig.storeFolder, uploadsDir, baseURL, uploadParent1);
        const { genraterUrl } = getGenrateUrl(babyGeneratorConfig.storeFolder, uploadsDir, baseURL, uploadParent1);
        const { uploadUrl: parent2Url } = getUploadUrl(babyGeneratorConfig.storeFolder, uploadsDir, baseURL, uploadParent2);

        const userCredit = req.user.credits;
        if (userCredit < babyGeneratorConfig.credit) {
            return new ResponseModal()
                .setStatus('error')
                .setStatusCode(403)
                .setMessage('Not enough credits');
        }
        const transactionEntry = await authDao.transaction_insert(userid, babyGeneratorConfig.descriptionTrans, babyGeneratorConfig.credit);
        const transactionId = transactionEntry.rows[0].id;
        
        await authDao.babygenerator_insert(userid, parent1Url, parent2Url, gender, genraterUrl, transactionId);
        await authDao.totalCredits(userid, babyGeneratorConfig.credit);

        return new ResponseModal()
            .setStatus('success')
            .setStatusCode(200)
            .setMessage('babyGenerator change saved')
            .setData({
                file: genraterUrl,
                fileUrl: genraterUrl
            });
    } catch (error) {
        console.error('babygenerator error:', error);
        return new ResponseModal()
            .setStatus('error')
            .setStatusCode(500)
            .setMessage('Server error');
    }
}
module.exports = {
    babyGenerator
}