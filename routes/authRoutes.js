import express from "express";
import {
  register,
  login,
  refreshToken,
  registerValidation,
} from "../controllers/authController.js";

import {
  authenticate,
  authorize,
} from "../middleware/authMiddleware.js";

import User from "../models/Auth.js";

const router = express.Router();

// 🔓 Public routes
router.post("/register", registerValidation, register);
router.post("/login", login);
router.post("/refresh", refreshToken);

// 🔒 Authenticated user profile
router.get("/profile", authenticate, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "username", "name", "role"],
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
});

// 🔒 Admin-only route
router.get("/admin", authenticate, authorize(["admin"]), async (req, res) => {
  res.json({ message: "Admin access granted", user: req.user });
});

export default router;
