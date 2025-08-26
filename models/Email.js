import pool from "../config/db.js";

class Email {
    static async create(email, subject, message) {
        const [result] = await pool.query(
            "INSERT INTO emails (email, subject, message) VALUES (?, ?, ?)",
            [email, subject, message]
        );
        return result.insertId;
    }

    static async getAll() {
        const [rows] = await pool.query("SELECT * FROM emails ORDER BY created_at DESC");
        return rows;
    }

    static async getById(id) {
        const [rows] = await pool.query("SELECT * FROM emails WHERE id = ?", [id]);
        return rows[0];
    }

    static async reply(id, replyMessage) {
        await pool.query("UPDATE emails SET reply = ? WHERE id = ?", [replyMessage, id]);
        return { id, replyMessage };
    }
}

export default Email;
