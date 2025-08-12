const isRequired = require('../../handler/utils/validator').isRequired
const auth = require('./core/changehair')


const agePredictorFn = async function (req) {
    let userId = isRequired(req.body.userId)
    let uploadImg = isRequired(req.body.uploadImg)
    let generatorImage = isRequired(req.body.generatorImage)
    let predictAge = isRequired(req.body.predictAge)
    let transactionId = isRequired(req.body.transactionId)

    return await auth.agePredictor(userId, uploadImg, generatorImage, predictAge, transactionId)
}

const ageJourneyFn = async function (req) {
}

const babyGeneratorFn = async function (req) {
}

const changeHairstyleFn = async function (req) {
    let userid = isRequired(req.body.userid);
    // let uploadimage = isRequired(req.file.filename); // from multer
    let uploadimage = isRequired(req.file.uploadimage);
    let gender = isRequired(req.body.gender);
    let hairStyle = isRequired(req.body.hairStyle);
    let hairColor = isRequired(req.body.hairColor);
    let genraterImg = isRequired(req.body.genraterImg);
    let transactionId = isRequired(req.body.transactionId);
    let createdAT = new Date();
    let updatedAT = new Date();

    return await auth.changeHair(email, password);
}

module.exports = {
    agePredictorFn,
    ageJourneyFn,
    babyGeneratorFn,
    changeHairstyleFn
}