import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ; // ✅ fallback for dev

export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Authorization header missing or malformed" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = {
            id: decoded.id,
            role: decoded.role || "admin", // ✅ fallback role
        };
        next();
    } catch (err) {
        console.error("JWT verification failed:", err);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

// ✅ Authorization middleware
export const authorize = (allowedRoles = []) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied: insufficient permissions" });
        }
        next();
    };
};
