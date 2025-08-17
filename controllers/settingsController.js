const pool = require('../config/db');

exports.getSettings = async (req, res) => {
    try {
        const userId = req.user.id;
        const [rows] = await pool.query('SELECT * FROM settings WHERE user_id = ?', [userId]);
        if (rows.length === 0) return res.status(404).json({ message: 'Settings not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving settings', error: err.message });
    }
};

exports.updateSettings = async (req, res) => {
    try {
        const userId = req.user.id;
        const { theme, notifications_enabled, language } = req.body;

        await pool.query(`
            INSERT INTO settings (user_id, theme, notifications_enabled, language)
            VALUES (?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
            theme = VALUES(theme),
            notifications_enabled = VALUES(notifications_enabled),
            language = VALUES(language)
        `, [userId, theme, notifications_enabled, language]);

        res.json({ message: 'Settings updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating settings', error: err.message });
    }
};

exports.resetSettings = async (req, res) => {
    try {
        const userId = req.user.id;
        await pool.query('DELETE FROM settings WHERE user_id = ?', [userId]);
        res.json({ message: 'Settings reset to default' });
    } catch (err) {
        res.status(500).json({ message: 'Error resetting settings', error: err.message });
    }
};
