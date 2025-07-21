const config = require('../config/config');
const jwt = require('jsonwebtoken');

const authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            status: false,
            message: 'Access denied. No token provided.',
        });
    }
    const token = authHeader.split(' ')[1]; // "Bearer <token>"
    if (!token) {
        return res.status(401).json({
            status: false,
            message: 'Access denied. No token provided.',
        });
    }
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            status: false,
            message: 'Invalid or expired token.',
        });
    }
};

module.exports = {
    authenticateJWT,
};