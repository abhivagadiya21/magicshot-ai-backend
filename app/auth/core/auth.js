const ResponseModal = require('../../../handler/http/ResponseModal')
const authDao = require('./dao')
const bcrypt = require('bcryptjs')

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

    return new ResponseModal()
        .setStatus("success")
        .setStatusCode(200)
        .setData({
            token: "generateToken",
            user: { id: user.id, email: user.email }
        });
};

const register = async function (email, password) {
    try {
        // check if user already exists
        let existingUser = await authDao.validateUser(email);
        if (existingUser.rows.length > 0) {
            return new ResponseModal()
                .setStatus("error")
                .setStatusCode(400)
                .setMessage("User already exists");
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ use authDao.registerUser (not registerUser.createUser)
        let res = await authDao.registerUser(email, hashedPassword);

        return new ResponseModal()
            .setStatus("success")
            .setStatusCode(201)
            .setData({
                user: { id: res.rows[0].id, email: res.rows[0].email }
            })
            .setMessage("User registered successfully");
    } catch (error) {
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
