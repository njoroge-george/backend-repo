import Backendcode from "../models/Backendcode.js";

// ➕ Create
export const createCode = async (req, res) => {
    try {
        const { title, content } = req.body;
        const code = await Backendcode.create({ title, content });
        res.status(201).json({ success: true, data: code });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// 📄 Get All Codes
export const getCodes = async (req, res) => {
    try {
        const codes = await Backendcode.findAll({ order: [["createdAt", "DESC"]] });
        res.json({ success: true, data: codes });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// 🔍 Get Single Code
export const getCodeById = async (req, res) => {
    try {
        const code = await Backendcode.findByPk(req.params.id);
        if (!code) return res.status(404).json({ success: false, message: "Not found" });
        res.json({ success: true, data: code });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// ✏️ Update Code
export const updateCode = async (req, res) => {
    try {
        const { title, content } = req.body;
        const code = await Backendcode.findByPk(req.params.id);
        if (!code) return res.status(404).json({ success: false, message: "Not found" });

        code.title = title || code.title;
        code.content = content || code.content;
        await code.save();

        res.json({ success: true, data: code });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// 🗑️ Delete Code
export const deleteCode = async (req, res) => {
    try {
        const code = await Backendcode.findByPk(req.params.id);
        if (!code) return res.status(404).json({ success: false, message: "Not found" });

        await code.destroy();
        res.json({ success: true, message: "Code deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
