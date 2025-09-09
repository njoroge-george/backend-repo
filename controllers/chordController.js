import Chord from "../models/Chord.js";

// ➕ Create a new chord
export const createChord = async (req, res) => {
    try {
        const { name, notes } = req.body;
        const chord = await Chord.create({ name, notes });
        res.status(201).json({ success: true, data: chord });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// 📄 Get all chords
export const getChords = async (req, res) => {
    try {
        const chords = await Chord.findAll({ order: [["createdAt", "DESC"]] });
        res.json({ success: true, data: chords });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// 🔍 Get single chord
export const getChordById = async (req, res) => {
    try {
        const chord = await Chord.findByPk(req.params.id);
        if (!chord) return res.status(404).json({ success: false, message: "Not found" });
        res.json({ success: true, data: chord });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// ✏️ Update chord
export const updateChord = async (req, res) => {
    try {
        const { name, notes } = req.body;
        const chord = await Chord.findByPk(req.params.id);
        if (!chord) return res.status(404).json({ success: false, message: "Not found" });

        chord.name = name || chord.name;
        chord.notes = notes || chord.notes;
        await chord.save();

        res.json({ success: true, data: chord });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// 🗑️ Delete chord
export const deleteChord = async (req, res) => {
    try {
        const chord = await Chord.findByPk(req.params.id);
        if (!chord) return res.status(404).json({ success: false, message: "Not found" });

        await chord.destroy();
        res.json({ success: true, message: "Chord deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
