import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET || JWT_SECRET;

// 🔐 Access Token Authentication
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
      role: decoded.role || "user",
      name: decoded.name || "",
    };
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired", expiredAt: err.expiredAt });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};

// 🔐 Role-Based Authorization
export const authorize = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied: insufficient permissions" });
    }
    next();
  };
};

// 🔄 Refresh Token Handler (optional if already in controller)
export const refreshToken = (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ message: "Refresh token missing" });

  try {
    const payload = jwt.verify(token, REFRESH_SECRET);
    const newToken = jwt.sign(
      { id: payload.id, role: payload.role, name: payload.name || "" },
      JWT_SECRET,
      { expiresIn: "10m" }
    );
    res.json({ token: newToken });
  } catch (err) {
    console.error("Refresh token error:", err);
    return res.status(401).json({ message: "Invalid or expired refresh token" });
  }
};
