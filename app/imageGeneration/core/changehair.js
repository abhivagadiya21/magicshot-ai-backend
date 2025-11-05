const ResponseModal = require('../../../handler/http/ResponseModal');
const authDao = require('./dao');
const path = require("path");
const { ValidationError } = require('../../../handler/http/error/ValidationError');
const getUploadUrl = require('../../../handler/config/uploadUrl');
const getGenrateUrl = require('../../../handler/config/genrate');
const { details, getConfigByStoreFolder } = require('../../../handler/config/config');
const changeHairConfig = getConfigByStoreFolder("Change_Hair");

const changeHair = async function (req, userid, gender, hairStyle, hairColor) {
  try {
    let uploadedFile = req.files?.HairuploadPhoto?.[0];
    if (!uploadedFile) {
      throw new ValidationError('HairuploadPhoto file is required');
    }
    const baseURL = `${req.protocol}://${req.get("host")}`;
    const uploadsDir = path.join(__dirname, "../../../uploads");
    const { uploadUrl } = getUploadUrl(changeHairConfig.storeFolder, uploadsDir, baseURL, uploadedFile);
    const { genraterUrl } = getGenrateUrl(changeHairConfig.storeFolder, uploadsDir, baseURL, uploadedFile);

    const userCredit = req.user.credits;
    if (userCredit < -changeHairConfig.credit) {
      return new ResponseModal()
        .setStatus('error')
        .setStatusCode(403)
        .setMessage('Not enough credits');
    }
    const transactionEntry = await authDao.transaction_insert(userid, changeHairConfig.descriptionTrans, changeHairConfig.credit);
    const transactionId = transactionEntry.rows[0].id;
    
    await authDao.changeHair_insert(userid, uploadUrl, gender, hairStyle, hairColor, genraterUrl, transactionId);
    await authDao.totalCredits(userid, changeHairConfig.credit);

    return new ResponseModal()
      .setStatus('success')
      .setStatusCode(200)
      .setMessage('Hair change saved')
      .setData({
        file: genraterUrl,
        fileUrl: genraterUrl
      });
  } catch (error) {
    console.error('changeHair error:', error);
    return new ResponseModal()
      .setStatus('error')
      .setStatusCode(500)
      .setMessage('Server error');
  }
};

module.exports = {
  changeHair
};