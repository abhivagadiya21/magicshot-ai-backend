const isRequired = require('../../handler/utils/validator').isRequired
const auth = require('./core/changehair')

const chnagehairstyleFn = async function (req) {
    let uploadPhoto = isRequired(req.body.uPhoto)
    return await auth.changeHair(uploadPhoto)
}

const agePredictorFn = async function (req) {
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