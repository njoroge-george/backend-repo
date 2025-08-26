import Email from "../models/Email.js";

export const sendEmail = async (req, res) => {
    try {
        const { email, subject, message } = req.body;
        const id = await Email.create(email, subject, message);
        res.status(201).json({ id, email, subject, message });
    } catch (err) {
        res.status(500).json({ error: "Failed to save email", details: err.message });
    }
};

export const getEmails = async (req, res) => {
    try {
        const emails = await Email.getAll();
        res.json(emails);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch emails" });
    }
};

export const getEmailById = async (req, res) => {
    try {
        const { id } = req.params;
        const email = await Email.getById(id);
        if (!email) return res.status(404).json({ error: "Email not found" });
        res.json(email);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch email" });
    }
};

export const replyToEmail = async (req, res) => {
    try {
        const { id } = req.params;
        const { replyMessage } = req.body;
        const updated = await Email.reply(id, replyMessage);
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: "Failed to reply" });
    }
};
