const isRequired = require('../../handler/utils/validator').isRequired
const auth = require('./core/changehair')

const chnagehairstyleFn = async function (req) {
    let uploadPhoto = isRequired(req.body.uPhoto)
    return await auth.changeHair(uploadPhoto)
}

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
}

module.exports = {
    agePredictorFn,
    ageJourneyFn,
    babyGeneratorFn,
    changeHairstyleFn
}