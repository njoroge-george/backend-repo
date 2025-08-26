// backend-repo/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import sequelize from './config/db.js';

// Import routes
import noteRoutes from './routes/noteRoutes.js';
import financeRoutes from './routes/financeRoutes.js';
import fitnessRoutes from './routes/fitnessRoutes.js';
import projectsRoutes from './routes/projectsRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import todoRoutes from './routes/todoRoutes.js';
import learningRoutes from './routes/learningRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import chatRouter from './routes/chatRouter.js';
import messageRoutes from "./routes/messageRoutes.js"; // <-- Ensure .js is here
import emailRoutes from './routes/emailRoutes.js';
import gradeRoutes from './routes/gradeRoutes.js';

// Chat controllers
import {
    handleJoin,
    handleMessage,
    handleTyping,
    handleDisconnect,
} from './controllers/chatController.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

// ------------------------
// MIDDLEWARES
// ------------------------
const CLIENT_URL = 'http://localhost:5173';
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());

// ------------------------
// API ROUTES
// ------------------------
const apiRoutes = [
    { path: '/api/notes', route: noteRoutes },
    { path: '/api/finance', route: financeRoutes },
    { path: '/api/fitness', route: fitnessRoutes },
    { path: '/api/contacts', route: contactRoutes },
    { path: '/api/todos', route: todoRoutes },
    { path: '/api/settings', route: settingsRoutes },
    { path: '/api/projects', route: projectsRoutes },
    { path: '/api/learning', route: learningRoutes },
    { path: '/api/recipes', route: recipeRoutes },
    { path: '/api/portfolio', route: portfolioRoutes },
    { path: '/api/chat', route: chatRouter },
    { path: '/api/messages', route: messageRoutes }, // <-- Fully integrated
    { path: '/api/email', route: emailRoutes },
    { path: '/api/grades', route: gradeRoutes },
];

apiRoutes.forEach(({ path, route }) => app.use(path, route));

// Health check
app.get('/health', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

// 404 handler
app.use((req, res) => res.status(404).json({ success: false, message: 'Not found' }));

// ------------------------
// SOCKET.IO SETUP
// ------------------------
const io = new Server(server, {
    cors: { origin: CLIENT_URL, credentials: true },
});

io.on('connection', (socket) => {
    console.log('🟢 User connected:', socket.id);

    socket.on('join', async ({ username }) => {
        try { await handleJoin(socket, username); }
        catch (err) { console.error('join error:', err); }
    });

    socket.on('message', async (msg) => {
        try { await handleMessage(socket, msg); }
        catch (err) { console.error('message error:', err); }
    });

    socket.on('typing', (data) => handleTyping(socket, data));

    socket.on('disconnect', async () => {
        try { await handleDisconnect(socket); }
        catch (err) { console.error('disconnect error:', err); }
        console.log('🔴 User disconnected:', socket.id);
    });
});

// ------------------------
// DATABASE & SERVER START
// ------------------------
const PORT = process.env.PORT || 5001;

console.log('--- Environment Variables ---');
['DB_HOST', 'DB_USER', 'DB_PASSWORD'].forEach((key) => {
    const val = process.env[key];
    console.log(`${key}:`, key === 'DB_PASSWORD' ? (val ? 'Loaded' : 'NOT LOADED') : val);
});
console.log('-----------------------------');

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log('✅ Database connected and synced.');
        server.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
    } catch (err) {
        console.error('❌ Failed to connect or sync DB:', err);
    }
})();
