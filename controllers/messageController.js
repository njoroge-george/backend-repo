import Message from "../models/messageModel.js";
import { sendEmail } from "../config/mailer.js";

// GET all messages (admin)
export const getMessages = async (req, res) => {
    try {
        const messages = await Message.findAll({
            order: [["createdAt", "DESC"]],
        });
        res.json(messages);
    } catch (err) {
        console.error("Error fetching messages:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// CREATE a new message (visitor)
export const createMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: "Name, email, and message are required" });
        }

        const newMessage = await Message.create({
            name,
            email,
            subject,
            message,
            read: false, // default as unread
        });

        res.status(201).json(newMessage);
    } catch (err) {
        console.error("Error creating message:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// REPLY to a message via email (admin)
export const replyToMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { reply } = req.body;

        if (!reply) return res.status(400).json({ message: "Reply cannot be empty" });

        const message = await Message.findByPk(id);
        if (!message) return res.status(404).json({ message: "Message not found" });

        // Send email using centralized mailer
        await sendEmail({
            to: message.email,
            subject: `Re: ${message.subject || "Your Message"}`,
            text: reply,
        });

        // Save reply in DB
        message.reply = reply;
        message.replySentAt = new Date();
        message.read = true; // Mark as read when replied
        await message.save();

        res.json({ message: "Reply sent successfully" });
    } catch (err) {
        console.error("Error sending reply:", err);
        res.status(500).json({ message: "Failed to send reply" });
    }
};

// PATCH: Mark a message as read/unread (admin)
export const markMessageRead = async (req, res) => {
    try {
        const { id } = req.params;
        const { read } = req.body;
        const message = await Message.findByPk(id);
        if (!message) return res.status(404).json({ message: "Message not found" });

        message.read = !!read;
        await message.save();
        res.json({ message: "Read status updated", read: message.read });
    } catch (err) {
        console.error("Error updating read status:", err);
        res.status(500).json({ message: "Failed to update read status" });
    }
};

// DELETE a message (admin)
export const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const message = await Message.findByPk(id);
        if (!message) return res.status(404).json({ message: "Message not found" });

        await message.destroy();
        res.json({ message: "Message deleted" });
    } catch (err) {
        console.error("Error deleting message:", err);
        res.status(500).json({ message: "Failed to delete message" });
    }
};