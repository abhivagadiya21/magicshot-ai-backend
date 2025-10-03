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
    let name = isRequired(req.body.name)
    return await auth.register(email, password,name)
}

const getUserProfileFn = async function (req) {
    let userId = req.user.id; // Assuming authMiddleware attaches user info to req.user
    return await auth.getUserProfile(userId);
}

const getUserTransactionsFn = async function (req) {
    let userId = req.user.id;   
    return await auth.getUserTransactions(userId);
}
module.exports = {
    loginFn,
    registerFn,
    getUserProfileFn,
    getUserTransactionsFn
}