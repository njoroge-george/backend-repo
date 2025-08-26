// controllers/chatController.js
import User from '../models/User.js';
import Message from '../models/Message.js';

export const handleJoin = async (socket, username) => {
    try {
        // Add user if not exists
        await User.findOrCreate({ where: { username } });
        socket.username = username;

        // Get all users
        const users = await User.findAll({ attributes: ['username'] });

        // Get message history (latest 100 messages)
        const messages = await Message.findAll({
            order: [['time', 'ASC']],
            limit: 100,
        });

        socket.emit('history', messages);
        socket.broadcast.emit('users', users.map(u => u.username));
        socket.emit('users', users.map(u => u.username));
    } catch (err) {
        console.error('handleJoin error:', err);
    }
};

export const handleMessage = async (socket, msg) => {
    try {
        // Save message
        const message = await Message.create({
            username: msg.username,
            text: msg.text,
        });

        // Broadcast to all clients
        socket.broadcast.emit('message', message);
        socket.emit('message', message);
    } catch (err) {
        console.error('handleMessage error:', err);
    }
};

export const handleTyping = (socket, data) => {
    socket.broadcast.emit('typing', data);
};

export const handleDisconnect = async (socket) => {
    try {
        if (socket.username) {
            // Remove user from DB
            await User.destroy({ where: { username: socket.username } });

            // Broadcast remaining users
            const users = await User.findAll({ attributes: ['username'] });
            socket.broadcast.emit('users', users.map(u => u.username));
        }
    } catch (err) {
        console.error('handleDisconnect error:', err);
    }
};
