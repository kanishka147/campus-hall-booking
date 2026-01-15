const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token. Authorization denied." });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: "User not found." });
        }

        // Attach user data to request
        req.user = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            department: user.department,
            position: user.position
        };

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Invalid or expired token." });
    }
}

module.exports = authMiddleware;
