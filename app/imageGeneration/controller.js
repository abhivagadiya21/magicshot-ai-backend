const isRequired = require('../../handler/utils/validator').isRequired
const auth = require('./core/changehair')

const chnagehairstyleFn = async function (req) {
    let uploadPhoto = isRequired(req.body.uPhoto)
    return await auth.changeHair(uploadPhoto)
}

const agePredictorFn = async function (req) {
    let email = isRequired(req.body.email)
    let password = isRequired(req.body.password)
    return await auth.login(email, password)
}

const registerFn = async function (req) {
    let email = isRequired(req.body.email)
    let password = isRequired(req.body.password)
    return await auth.register(email, password)
}

module.exports = {
    chnagehairstyleFn,
    loginFn,
    registerFn
}