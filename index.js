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
import {
    handleJoin,
    handleMessage,
    handleTyping,
    handleDisconnect,
} from './controllers/chatController.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'https://njoroge.franbethfamily.com', // Change to your frontend URL
        credentials: true,
    },
});

app.use(cors({
    origin: 'https://njoroge.franbethfamily.com', // Change to your frontend URL
    credentials: true,
}));
app.use(express.json());

// API Routes
app.use('/api/notes', noteRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/fitness', fitnessRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api', learningRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/chat', chatRouter);

// Health & basic
app.get('/', (req, res) => res.send({ ok: true, time: new Date().toISOString() }));

// Default Root Route
app.get('/', (req, res) => {
    res.send('🚀 Welcome to the Fullstack API (Fitness + Finance + Notes + Projects + Contacts)');
});

// 404 handler
app.use((req, res) => res.status(404).json({ success: false, message: 'Not found' }));

// Socket.io chat logic
io.on('connection', (socket) => {
    socket.on('join', ({ username }) => handleJoin(socket, username));
    socket.on('message', (msg) => handleMessage(socket, msg));
    socket.on('typing', (data) => handleTyping(socket, data));
    socket.on('disconnect', () => handleDisconnect(socket));
});

// Sync DB and Start Server
const PORT = process.env.PORT || 5001;

console.log('--- Checking Environment Variables ---');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? 'Loaded' : 'NOT LOADED');
console.log('------------------------------------');

sequelize.sync({ alter: true })
    .then(() => {
        console.log('✅ Database connected and synced successfully.');
        server.listen(PORT, () => {
            console.log(`✅ Server running at: http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Failed to connect or sync DB:', err);
    });