// backend-repo/controllers/achievementController.js
import db from '../config/db.js';

const getAchievements = async (req, res) => {
    const [rows] = await db.query('SELECT * FROM achievements WHERE user_id = ?', [req.user.id]);
    res.json(rows);
};

const addAchievement = async (req, res) => {
    const { label } = req.body;
    const [result] = await db.query('INSERT INTO achievements (user_id, label) VALUES (?, ?)', [req.user.id, label]);
    res.status(201).json({ id: result.insertId, label });
};

export default {
    getAchievements,
    addAchievement
};