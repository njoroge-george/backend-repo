// controllers/chatController.js
export const handleJoin = async (db, socket, username) => {
    // Add user if not exists
    await db.query('INSERT IGNORE INTO users (username) VALUES (?)', [username]);
    socket.username = username;

    // Get all users
    const [userRows] = await db.query('SELECT username FROM users');
    // Get message history
    const [messageRows] = await db.query('SELECT * FROM messages ORDER BY time ASC LIMIT 100');

    socket.emit('history', messageRows);
    socket.broadcast.emit('users', userRows.map(u => u.username));
    socket.emit('users', userRows.map(u => u.username));
};

export const handleMessage = async (db, socket, msg) => {
    await db.query('INSERT INTO messages (username, text) VALUES (?, ?)', [msg.username, msg.text]);
    const [rows] = await db.query('SELECT * FROM messages ORDER BY id DESC LIMIT 1');
    const message = rows[0];
    socket.broadcast.emit('message', message);
    socket.emit('message', message);
};

export const handleTyping = (socket, data) => {
    socket.broadcast.emit('typing', data);
};

export const handleDisconnect = async (db, socket) => {
    if (socket.username) {
        await db.query('DELETE FROM users WHERE username = ?', [socket.username]);
        const [userRows] = await db.query('SELECT username FROM users');
        socket.broadcast.emit('users', userRows.map(u => u.username));
    }
};