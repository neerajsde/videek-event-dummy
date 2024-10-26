const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = (req, res, next) => {
    try {
        // Combine all potential token sources
        let token = req.cookies.lionDen || req.body.token || req.headers["authorization"]?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authorization token is missing",
            });
        }

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid or expired token",
                });
            }

            // Token is valid, attach payload to request object
            req.user = payload;
            next();
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};