const db = require('../config/db');

exports.getCourses = async (req, res) => {
    const [rows] = await db.query('SELECT * FROM courses WHERE user_id = ?', [req.user.id]);
    res.json(rows);
};

exports.addCourse = async (req, res) => {
    const { name, progress } = req.body;
    const [result] = await db.query('INSERT INTO courses (user_id, name, progress) VALUES (?, ?, ?)', [req.user.id, name, progress || 0]);
    res.status(201).json({ id: result.insertId, name, progress });
};
