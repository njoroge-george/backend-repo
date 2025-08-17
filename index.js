const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/db');
// Import routes
const noteRoutes = require('./routes/noteRoutes');
const financeRoutes = require('./routes/financeRoutes');
const fitnessRoutes = require('./routes/fitnessRoutes');
const projectsRoutes = require('./routes/projectsRoutes');
const contactRoutes = require('./routes/contactRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const todoRoutes = require('./routes/todoRoutes');
const learningRoutes = require('./routes/learningRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');

const app = express();

// Global Middlewares
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// API Routes
app.use('/api/notes', noteRoutes);            // Learning notes (topic, content)
app.use('/api/finance', financeRoutes);      // Expense tracker
app.use('/api/fitness', fitnessRoutes);       // Workout tracker

// health & basic
app.get('/', (req, res) => res.send({ ok: true, time: new Date().toISOString() }));

app.use('/api/contacts', contactRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api', learningRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/portfolio', portfolioRoutes);
// Default Root Route
app.get('/', (req, res) => {
    res.send('🚀 Welcome to the Fullstack API (Fitness + Finance + Notes + Projects + Contacts)');
});
// 404 handler
app.use((req, res) => res.status(404).json({ success: false, message: 'Not found' }));
// Sync DB and Start Server
const PORT = process.env.PORT || 5000;

sequelize.sync({alter: true}) // Use { force: true } to reset tables
    .then(() => {
        console.log('✅ Database connected and synced successfully.');
        app.listen(PORT, () => {
            console.log(`✅ Server running at: http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Failed to connect or sync DB:', err);
    });
