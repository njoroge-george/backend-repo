// controllers/chatController.js
import User from '../models/User.js';
import Message from '../models/Message.js';
import Room from '../models/Room.js';

// In-memory online users per room
const onlineUsers = {}; // { roomId: Set([username1, username2]) }

export const handleJoin = async (socket, { username, roomName }) => {
    try {
        // Ensure room exists
        const [room] = await Room.findOrCreate({ where: { name: roomName } });

        // Ensure user exists
        const [user] = await User.findOrCreate({ where: { username } });
        await user.update({ isOnline: true });

        // Set socket properties
        socket.userId = user.id;
        socket.roomId = room.id;
        socket.join(room.name);

        // Track online users in memory
        if (!onlineUsers[room.id]) onlineUsers[room.id] = new Set();
        onlineUsers[room.id].add(username);

        // Fetch last 100 messages for this room
        const messages = await Message.findAll({
            where: { roomId: room.id },
            include: [User],
            order: [['createdAt', 'ASC']],
            limit: 100
        });

        // Send message history and online users
        socket.emit('history', messages);
        socket.to(room.name).emit('users', Array.from(onlineUsers[room.id]));
        socket.emit('users', Array.from(onlineUsers[room.id]));

    } catch (err) {
        console.error('handleJoin error:', err);
    }
};

export const handleMessage = async (socket, { text }) => {
    try {
        if (!socket.roomId || !socket.userId) return;

        // Save message
        const message = await Message.create({
            text,
            userId: socket.userId,
            roomId: socket.roomId
        });

        // Fetch the message with user info for broadcasting
        const fullMessage = await Message.findOne({
            where: { id: message.id },
            include: [User]
        });

        // Broadcast to room
        const room = await Room.findByPk(socket.roomId);
        socket.to(room.name).emit('message', fullMessage);
        socket.emit('message', fullMessage);

    } catch (err) {
        console.error('handleMessage error:', err);
    }
};

export const handleTyping = (socket, data) => {
    if (!socket.roomId) return;
    Room.findByPk(socket.roomId).then(room => {
        if (room) socket.to(room.name).emit('typing', data);
    });
};

export const handleDisconnect = async (socket) => {
    try {
        const { userId, roomId } = socket;
        if (userId && roomId) {
            // Update user online status
            await User.update({ isOnline: false }, { where: { id: userId } });

            // Remove from in-memory tracker
            if (onlineUsers[roomId]) {
                const user = await User.findByPk(userId);
                onlineUsers[roomId].delete(user.username);

                const room = await Room.findByPk(roomId);
                socket.to(room.name).emit('users', Array.from(onlineUsers[roomId]));
            }
        }
    } catch (err) {
        console.error('handleDisconnect error:', err);
    }
};
