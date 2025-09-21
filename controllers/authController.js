import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/Auth.js";

const JWT_SECRET = process.env.JWT_SECRET;

// 📝 Register
export const register = async (req, res) => {
  try {
    console.log("Register body received:", req.body);

    const { username, password, role = "admin", name = "" } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      role,
      name,
    });

    return res.status(201).json({
      message: "User registered successfully",
      userId: newUser.id,
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ error: "Server error during registration" });
  }
};

// 🔐 Login
export const login = async (req, res) => {
  try {
    console.log("Login request body:", req.body);

    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const tokenPayload = {
      id: user.id,
      role: user.role,
      name: user.name || "",
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "2d" });

    return res.json({
      id: user.id,
      role: user.role,
      name: user.name || "",
      username: user.username,
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error during login" });
  }
};
