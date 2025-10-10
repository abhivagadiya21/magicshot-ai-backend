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
    return await auth.register(email, password, name)
}

const getUserProfileFn = async function (req) {
    let userId = req.user.id; // Assuming authMiddleware attaches user info to req.user
    // const profileImg = req.savedFiles ? req.savedFiles.profileImage : null;
    return await auth.getUserProfile(userId);
}

const getUserImageHistoryFn = async function (req) {
    let userId = req.user.id;
    return await auth.getUserImageHistory(userId);
}

const setProfileImageFn = async function (req) {
    let userId = req.user.id;
    // const profileImg = req.files.profileImage ? req.files.profileImage[0].filename : null;
    const profileImg = req.file ? req.file.filename : null; // ✅ Corrected
    return await auth.setProfileImage(req, userId, profileImg);
}

const setProfileInfoFn = async function (req) {
    let userId = req.user.id;
    const userName = req.body.username;
    const bio = req.body.bio;
    return await auth.setProfileInfo(userId, userName, bio);
}

const getUserTransactionsFn = async function (req) {
    let userId = req.user.id;
    return await auth.getUserTransactions(userId);
}
module.exports = {
    loginFn,
    registerFn,
    getUserProfileFn,
    getUserTransactionsFn,
    setProfileImageFn,
    setProfileInfoFn, getUserImageHistoryFn
}