
const ResponseModal = require('../../../handler/http/ResponseModal');
const { get } = require('../../../routes/auth');
const path = require("path");
const getUploadUrl = require('../../../handler/config/uploadUrl');
const authDao = require('./dao')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { token } = require('morgan');

const addSignUpBounsConfig = require('../../../handler/config/config').getConfigByStoreFolder("addsignupbouns");

const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );
};

const addSignUpBouns = async (userId) => {
    try {
        const creditBouns = await authDao.addSignUpBouns(userId);
        if (!creditBouns || creditBouns.rowCount === 0) {
            return new ResponseModal()
                .setStatus('error')
                .setStatusCode(400)
                .setMessage('bouns failed');
        }
        const transactionEntry = await authDao.transaction_insert(userId, 'Sign Up Bonus', addSignUpBounsConfig.credit);
        if (!transactionEntry || transactionEntry.rowCount === 0) {
            return new ResponseModal()
                .setStatus('error')
                .setStatusCode(400)
                .setMessage('transaction failed');
        }
        return new ResponseModal()
            .setStatus('success')
            .setStatusCode(200)
            .setMessage('bouns success')
            .setData({
                credits: creditBouns.rows[0].credit
            });
    } catch (error) {
        console.error(" Bonus Function Error:", error.message);

        return new ResponseModal()
            .setStatus('error')
            .setStatusCode(500)
            .setMessage('internal server error');
    }
};
const getUserTransactions = async (userId) => {
    try {
        const getTransactions = await authDao.getTransactions(userId);
        return new ResponseModal()
            .setStatus('success')
            .setStatusCode(200)
            .setMessage('transaction fetch success')
            .setData({
                transactionsDetails: getTransactions.rows
            });
    } catch (error) {
        console.error(" Get Transactions Function Error:", error.message);
        return new ResponseModal()
            .setStatus('error')
            .setStatusCode(500)
            .setMessage('internal server error');
    }
}
const getUserProfile = async (userId) => {
    try {
        const credit = await authDao.getcredit(userId);
        if (!credit || credit.rowCount === 0) {
            return new ResponseModal()
                .setStatus('error')
                .setStatusCode(400)
                .setMessage('credit fetch failed');
        }

        return new ResponseModal()
            .setStatus('success')
            .setStatusCode(200)
            .setMessage('credit fetch success')
            .setData({
                credits: credit.rows[0].credit,
                name: credit.rows[0].name,
                email: credit.rows[0].email,
                username: credit.rows[0].username,
                bio: credit.rows[0].bio,
                profileImage: credit.rows[0].profileimage
            });
    } catch (error) {
        console.error(" Get Credit Function Error:", error.message);

        return new ResponseModal()
            .setStatus('error')
            .setStatusCode(500)
            .setMessage('internal server error');
    }
}

const setProfileImage = async (req, userId, profileImg) => {
    try {
        console.log("Profile Image Filename:", profileImg);
        // const baseURL = `${req.protocol}://${req.get("host")}`;
        const baseURL = `https://${req.get("host")}`;
        const uploadsDir = path.join(__dirname, "../../../uploads");
        const { uploadUrl } = getUploadUrl("profile_pics", uploadsDir, baseURL, profileImg);

        const updateProfileImage = await authDao.insertProfileImage(userId, uploadUrl); // Assuming userName and bio are not being updated here
        if (!updateProfileImage || updateProfileImage.rowCount === 0) {
            return new ResponseModal()
                .setStatus('error')
                .setStatusCode(400)
                .setMessage('Profile image update failed');
        }
        return new ResponseModal()
            .setStatus('success')
            .setStatusCode(200)
            .setMessage('Profile image updated successfully')
            .setData({
                // profileImage: updateProfileImage.rows[0].profileimage
                profileImage: uploadUrl
            });
    } catch (error) {
        console.error(" Update Profile Image Function Error:", error.message);
        return new ResponseModal()
            .setStatus('error')
            .setStatusCode(500)
            .setMessage('internal server error');
    }
}

const setProfileInfo = async (userId, userName, bio) => {
    try {
        const updateProfileInfo = await authDao.insertProfileInfo(userId, userName, bio); // Assuming profileImg is not being updated here        
        if (!updateProfileInfo || updateProfileInfo.rowCount === 0) {
            return new ResponseModal()
                .setStatus('error')
                .setStatusCode(400)
                .setMessage('Profile info update failed');
        }
        return new ResponseModal()
            .setStatus('success')
            .setStatusCode(200)
            .setMessage('Profile info updated successfully')
            .setData({
                userName: updateProfileInfo.rows[0].username,
                bio: updateProfileInfo.rows[0].bio
            });
    } catch (error) {
        console.error(" Update Profile Info Function Error:", error.message);
        return new ResponseModal()
            .setStatus('error')
            .setStatusCode(500)
            .setMessage('internal server error');
    }
}

const getUserImageHistory = async (userId) => {
    try {
        const imageHistory = await authDao.imageHistory(userId);
        if (!imageHistory) {
            return new ResponseModal()
                .setStatus('error')
                .setStatusCode(400)
                .setMessage('Image history fetch failed');
        }
        // console.log(" Image History:", imageHistory.rows);
        return new ResponseModal()
            .setStatus('success')
            .setStatusCode(200)
            .setMessage('Image history fetch success')
            .setData({
                images: imageHistory.rows
            })
    } catch (error) {
        console.error(" Get Image History Function Error:", error.message);
        return new ResponseModal()
            .setStatus('error')
            .setStatusCode(500)
            .setMessage('internal server error');
    }
}


const login = async function (email, password) {
    let res = await authDao.validateUser(email);
    if (res.rows.length === 0) {
        return new ResponseModal()
            .setStatus("error")
            .setStatusCode(401)
            .setMessage("Invalid email or password");
    }

    const user = res.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return new ResponseModal()
            .setStatus("error")
            .setStatusCode(401)
            .setMessage("Invalid email or password");
    }


    const token = generateToken(user);
    // const creditRes = await authDao.getcredit(user.id);
    // const credits = creditRes.rows[0].credit;
    return new ResponseModal()
        .setStatus("success")
        .setStatusCode(200)
        .setData({
            token,
            user: { id: user.id, email: user.email, credit: user.credits }
        });
};

const register = async function (email, password, name) {
    try {
        let existingUser = await authDao.validateUser(email);
        if (existingUser.rows.length > 0) {
            return new ResponseModal()
                .setStatus("error")
                .setStatusCode(400)
                .setMessage("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        let res = await authDao.registerUser(email, hashedPassword, name);
        const user = res.rows[0];
        console.log('Registered user:', user);
        await addSignUpBouns(user.id);
        const token = generateToken(user);
        // await getcredit(user.id);

        return new ResponseModal()
            .setStatus("success")
            .setStatusCode(200)
            .setData({
                token,
                user: { id: user.id, email: user.email, credit: user.credits }
                // bouns: addSignUpBouns(user.id),
            })
            .setMessage("User registered successfully");
    } catch (error) {
        console.log(error);
        return new ResponseModal()
            .setStatus("error")
            .setStatusCode(500)
            .setMessage(error.message);
    }
};
const changePassword = async function (userId, oldPassword, newPassword) {
    try {
        let res = await authDao.getcredit(userId);
        const user = res.rows[0];
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return new ResponseModal()
                .setStatus("error")
                .setStatusCode(401)
                .setMessage("Current password is incorrect");
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await authDao.updatePassword(userId, hashedNewPassword);
        console.log('Password updated for user ID:', userId);
        return new ResponseModal()
            .setStatus("success")
            .setStatusCode(200)
            .setMessage("Password updated successfully");
    } catch (error) {
        console.log(error);
        return new ResponseModal()
            .setStatus("error")
            .setStatusCode(500)
            .setMessage("Internal server error");
    }
}
module.exports = {
    login,
    register,
    getUserProfile,
    getUserTransactions,
    setProfileImage,
    setProfileInfo,
    getUserImageHistory,
    changePassword
}
