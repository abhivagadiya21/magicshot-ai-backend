
const ResponseModal = require('../../../handler/http/ResponseModal')
const authDao = require('./dao')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
        const transactionEntry = await authDao.transaction_insert(userId, 'Sign Up Bonus', 100);
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

    return new ResponseModal()
        .setStatus("success")
        .setStatusCode(200)
        .setData({
            token,
            user: { id: user.id, email: user.email }
        });
};

const register = async function (email, password) {
    try {
        let existingUser = await authDao.validateUser(email);
        if (existingUser.rows.length > 0) {
            return new ResponseModal()
                .setStatus("error")
                .setStatusCode(400)
                .setMessage("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        let res = await authDao.registerUser(email, hashedPassword);
        const user = res.rows[0];
        console.log('Registered user:', user);
        await addSignUpBouns(user.id);
        const token = generateToken(user);

        return new ResponseModal()
            .setStatus("success")
            .setStatusCode(200)
            .setData({
                token,
                user: { id: user.id, email: user.email }
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

module.exports = {
    login,
    register
}
