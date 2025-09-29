import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/Auth.js";
import { body, validationResult } from "express-validator";

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET || JWT_SECRET;

// 🛠️ Utility: Generate tokens
const generateTokens = (user) => {
  const payload = { id: user.id, role: user.role, name: user.name || "" };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" }); // short-lived
  const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" }); // long-lived

  return { token, refreshToken };
};

// 📝 Validation rules
export const registerValidation = [
  body("username").isLength({ min: 4 }).withMessage("Username must be at least 4 characters"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  body("role").optional().isIn(["admin", "user"]).withMessage("Invalid role"),
];

// 🔐 Register
export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, password, role = "admin", name = "" } = req.body;

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword, role, name });

    res.status(201).json({ message: "User registered successfully", userId: newUser.id });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error during registration" });
  }
};

// 🔐 Login
export const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const { token, refreshToken } = generateTokens(user);

    res.json({
      user: {
        id: user.id,
        role: user.role,
        name: user.name,
        username: user.username,
      },
      token,
      refreshToken,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
};

// 🔄 Refresh Token
export const refreshToken = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: "Refresh token missing" });

  try {
    const payload = jwt.verify(token, REFRESH_SECRET);

    // Optional: rotate refresh token
    const user = await User.findByPk(payload.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const { token: newToken, refreshToken: newRefresh } = generateTokens(user);

    res.json({ token: newToken, refreshToken: newRefresh });
  } catch (err) {
    console.error("Refresh token error:", err);
    res.status(401).json({ error: "Invalid or expired refresh token" });
  }
};
