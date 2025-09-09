import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/Auth.js";

// Register
// Register
export const register = async (req, res) => {
    try {
        console.log("Register body received:", req.body); // 👀 Debug

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        // Does user already exist?
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new user
        const newUser = await User.create({
            username,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: "User registered successfully",
            userId: newUser.id,
        });
    } catch (err) {
        console.error("Register error:", err);
        return res.status(500).json({ error: err.message });
    }
};


// Login
export const login = async (req, res) => {
    try {
        console.log("Login request body:", req.body); // 👀 Debug
        const { username, password } = req.body;

        // Find by username
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(400).json({ message: "User not found" });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid password" });

        // Generate JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.json({ token });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error" });
    }
};
