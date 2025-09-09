import Document from "../models/Document.js";

// ➕ Create Document
export const createDocument = async (req, res) => {
    try {
        const { title, content } = req.body;
        const doc = await Document.create({ title, content });
        res.status(201).json({ success: true, data: doc });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// 📄 Get All Documents
// 📄 Get All Documents
export const getDocuments = async (req, res) => {
    try {
        const docs = await Document.findAll({ order: [["createdAt", "DESC"]] });
        res.json({ success: true, data: docs });
    } catch (err) {
        console.error("❌ Error in getDocuments:", err); // <--- log exact error
        res.status(500).json({ success: false, message: err.message });
    }
};


// 🔍 Get Single Document
export const getDocumentById = async (req, res) => {
    try {
        const doc = await Document.findByPk(req.params.id);
        if (!doc) return res.status(404).json({ success: false, message: "Not found" });
        res.json({ success: true, data: doc });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// ✏️ Update Document
export const updateDocument = async (req, res) => {
    try {
        const { title, content } = req.body;
        const doc = await Document.findByPk(req.params.id);
        if (!doc) return res.status(404).json({ success: false, message: "Not found" });

        doc.title = title || doc.title;
        doc.content = content || doc.content;
        await doc.save();

        res.json({ success: true, data: doc });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// 🗑️ Delete Document
export const deleteDocument = async (req, res) => {
    try {
        const doc = await Document.findByPk(req.params.id);
        if (!doc) return res.status(404).json({ success: false, message: "Not found" });

        await doc.destroy();
        res.json({ success: true, message: "Document deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
