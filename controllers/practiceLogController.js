// backend-repo/controllers/practiceLogController.js
import db from '../config/db.js';

const getLogs = async (req, res) => {
    const [rows] = await db.query(
        'SELECT * FROM practice_logs WHERE user_id = ? ORDER BY date DESC',
        [req.user.id]
    );
    res.json(rows);
};

const addLog = async (req, res) => {
    const { activity } = req.body;
    const [result] = await db.query(
        'INSERT INTO practice_logs (user_id, activity) VALUES (?, ?)',
        [req.user.id, activity]
    );
    res.status(201).json({ id: result.insertId, activity });
};

export default {
    getLogs,
    addLog
};