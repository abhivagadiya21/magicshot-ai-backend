const isRequired = require('../../handler/utils/validator').isRequired
const auth = require('./core/auth')

const loginFn = async function (req) {
    let email = isRequired(req.body.email)
    let password = isRequired(req.body.password)
    return await auth.login(email, password)
}


const registerFn = async function (req) {
    let email = isRequired(req.body.email)
    let password = isRequired(req.body.password)
    return await auth.register(email, password)
}

const getUserProfileFn = async function (req) {
    let userId = req.user.id; // Assuming authMiddleware attaches user info to req.user
    return await auth.getUserProfile(userId);
}

module.exports = {
    loginFn,
    registerFn,
    getUserProfileFn
}