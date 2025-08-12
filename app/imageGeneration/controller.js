const isRequired = require('../../handler/utils/validator').isRequired
const auth = require('./core/changehair')

const chnagehairstyleFn = async function (req) {
    let uploadPhoto = isRequired(req.body.uPhoto)
    return await auth.changeHair(uploadPhoto)
}

module.exports = {
    chnagehairstyleFn
}