// backend-repo/controllers/courseController.js
import db from '../config/db.js';

const getCourses = async (req, res) => {
    const [rows] = await db.query('SELECT * FROM courses WHERE user_id = ?', [req.user.id]);
    res.json(rows);
};

const addCourse = async (req, res) => {
    const { name, progress } = req.body;
    const [result] = await db.query(
        'INSERT INTO courses (user_id, name, progress) VALUES (?, ?, ?)',
        [req.user.id, name, progress || 0]
    );
    res.status(201).json({ id: result.insertId, name, progress });
};

export default {
    getCourses,
    addCourse
};