const db = require('../config/db');
const Note = require('../models/Note');

exports.getAllNotes = async (req, res) => {
    try {
        const notes = await Note.findAll({ order: [['date', 'DESC']] });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch notes' });
    }
};

exports.createNote = async (req, res) => {
    try {
        const note = await Note.create(req.body);
        res.status(201).json(note);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create note' });
    }
};

exports.updateNote = async (req, res) => {
    try {
        const note = await Note.findByPk(req.params.id);
        if (!note) return res.status(404).json({ error: 'Note not found' });

        await note.update(req.body);
        res.json(note);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update note' });
    }
};

exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findByPk(req.params.id);
        if (!note) return res.status(404).json({ error: 'Note not found' });

        await note.destroy();
        res.json({ message: 'Note deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete note' });
    }
};
