// routes/chatRoutes.js
import { Router } from "express";
import Room from "../models/Room.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

const router = Router();

/**
 * ✅ GET chat history by room name
 * Example: GET /api/chat/history?room=General
 */
router.get("/history", async (req, res) => {
    const { room } = req.query;
    if (!room) {
        return res.status(400).json({ success: false, message: "Room name is required" });
    }

    try {
        const roomObj = await Room.findOne({ where: { name: room } });
        if (!roomObj) {
            return res.status(404).json({ success: false, message: "Room not found" });
        }

        const messages = await Message.findAll({
            where: { roomId: roomObj.id },
            include: [{ model: User, attributes: ["username"] }],
            order: [["createdAt", "ASC"]],
            limit: 100,
        });

        res.json({ success: true, data: messages });
    } catch (err) {
        console.error("❌ Failed to fetch chat history:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

/**
 * ✅ GET all available rooms
 * Example: GET /api/chat/rooms
 */
router.get("/rooms", async (_req, res) => {
    try {
        const rooms = await Room.findAll({ attributes: ["id", "name"] });
        res.json({ success: true, data: rooms });
    } catch (err) {
        console.error("❌ Failed to fetch rooms:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

/**
 * ✅ GET all online users
 * Example: GET /api/chat/users
 */
router.get("/users", async (_req, res) => {
    try {
        const users = await User.findAll({
            where: { isOnline: true },
            attributes: ["id", "username"],
        });

        res.json({ success: true, data: users });
    } catch (err) {
        console.error("❌ Failed to fetch online users:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

export default router;
