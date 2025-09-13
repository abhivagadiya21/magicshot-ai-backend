const { validForGenrater } = require('../app/imageGeneration/core/dao/index')
const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const credits = await validForGenrater(decoded.id);
        req.user = {
            id: decoded.id,
            email: decoded.email,
            credits: credits.rows[0].credit
        }

        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}

module.exports = authMiddleware;
