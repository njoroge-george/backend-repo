// backend-repo/App.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import sequelize from "./config/db.js";

// Load env variables
dotenv.config();

// Constants
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const PORT = process.env.PORT || 5001;

// Import routes
import noteRoutes from "./routes/noteRoutes.js";
import financeRoutes from "./routes/financeRoutes.js";
import fitnessRoutes from "./routes/fitnessRoutes.js";
import projectsRoutes from "./routes/projectsRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import learningRoutes from "./routes/learningRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import chatRouter from "./routes/chatRouter.js";
import messageRoutes from "./routes/messageRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import gradeRoutes from "./routes/gradeRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import backendcodeRoutes from "./routes/backendcodeRoutes.js";
import chordRoutes from "./routes/chordRoutes.js";
import aiChatRoutes from "./routes/aiChatRoutes.js";
import accountRoutes from "./routes/accountRoutes.js"; // ATM routes
import coderRoutes from "./routes/coderRoutes.js";
import challengeRoutes from "./routes/challengeRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";



// Chat controllers
import {
    handleJoin,
    handleMessage,
    handleTyping,
    handleDisconnect,
} from "./controllers/chatController.js";

const app = express();
const server = http.createServer(app);

// MIDDLEWARES
const allowedOrigins = [
    "http://localhost:5173",
    "https://njoroge.franbethfamily.com",
];

// ⚡ Initialize Socket.IO with error handling
const io = new Server(server, {
    cors: { 
        origin: allowedOrigins, 
        credentials: true, 
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type", "Authorization"]
    },
    handlePreflightRequest: (req, res) => {
        res.writeHead(200, {
            "Access-Control-Allow-Origin": allowedOrigins,
            "Access-Control-Allow-Methods": "GET,POST",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Credentials": true
        });
        res.end();
    }
});

// Enhanced CORS middleware with error handling
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            const msg = `CORS policy does not allow access from origin: ${origin}`;
            console.error(`🚫 CORS Error: ${msg}`);
            return callback(new Error(msg));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Body parser middleware with size limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS error handler
app.use((err, req, res, next) => {
    if (err.message.includes('CORS')) {
        res.status(403).json({
            error: 'CORS Error',
            message: err.message
        });
    } else {
        next(err);
    }
});

// ROUTES
const apiRoutes = [
    { path: "/api/notes", route: noteRoutes },
    { path: "/api/finance", route: financeRoutes },
    { path: "/api/fitness", route: fitnessRoutes },
    { path: "/api/contacts", route: contactRoutes },
    { path: "/api/todos", route: todoRoutes },
    { path: "/api/settings", route: settingsRoutes },
    { path: "/api/projects", route: projectsRoutes },
    { path: "/api/learning", route: learningRoutes },
    { path: "/api/recipes", route: recipeRoutes },
    { path: "/api/portfolio", route: portfolioRoutes },
    { path: "/api/chat", route: chatRouter },
    { path: "/api/messages", route: messageRoutes },
    { path: "/api/email", route: emailRoutes },
    { path: "/api/grades", route: gradeRoutes },
    { path: "/api/auth", route: authRoutes },
    { path: "/api/documents", route: documentRoutes },
    { path: "/api/code", route: backendcodeRoutes },
    { path: "/api/chords", route: chordRoutes },
    { path: "/api/aichat", route: aiChatRoutes },
    { path: "/api/accounts", route: accountRoutes },
   { path: "/api/coders", route: coderRoutes },
{ path: "/api/challenges", route: challengeRoutes },
{ path: "/api/submissions", route: submissionRoutes },

];

apiRoutes.forEach(({ path, route }) => app.use(path, route));

// Health check
app.get("/api/health", (req, res) =>
    res.json({ ok: true, time: new Date().toISOString() })
);

// 404 handler
app.use((req, res) =>
    res.status(404).json({ success: false, message: "Not found" })
);

// ================== SOCKET.IO NAMESPACES ================== //

// Chat namespace
const chatNamespace = io.of("/chat");
chatNamespace.on("connection", (socket) => {
    console.log("🟢 User connected to chat:", socket.id);

    socket.on("join", async ({ username, roomName }) => {
        try {
            await handleJoin(socket, { username, roomName });
        } catch (err) {
            console.error("chat join error:", err);
        }
    });

    socket.on("message", async (msg) => {
        try {
            await handleMessage(socket, msg);
        } catch (err) {
            console.error("chat message error:", err);
        }
    });

    socket.on("typing", (data) => handleTyping(socket, data));

    socket.on("disconnect", async () => {
        try {
            await handleDisconnect(socket);
        } catch (err) {
            console.error("chat disconnect error:", err);
        }
        console.log("🔴 User disconnected from chat:", socket.id);
    });
});

// Coding namespace
const codingNamespace = io.of("/coding");
app.set("codingNamespace", codingNamespace);

codingNamespace.on("connection", (socket) => {
    console.log("🟢 User connected to coding:", socket.id);

    socket.on("joinChallenge", ({ coderId, challengeId }) => {
        socket.join(`challenge_${challengeId}`);
        console.log(`${coderId} joined challenge ${challengeId}`);
    });

    socket.on("submitCode", (submission) => {
        // Broadcast new submission to others in the same challenge room
        codingNamespace
            .to(`challenge_${submission.challengeId}`)
            .emit("newSubmission", submission);
    });

    socket.on("disconnect", () => {
        console.log("🔴 User disconnected from coding:", socket.id);
    });
});

// ================== DATABASE & SERVER START ================== //
console.log("--- Environment Variables ---");
["DB_HOST", "DB_USER", "DB_PASSWORD"].forEach((key) => {
    const val = process.env[key];
    console.log(
        `${key}:`,
        key === "DB_PASSWORD" ? (val ? "Loaded" : "NOT LOADED") : val
    );
});
console.log("-----------------------------");

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        console.log("✅ Database connected and synced.");
        server.listen(PORT, () =>
            console.log(`✅ Server running at http://localhost:${PORT}`)
        );
    } catch (err) {
        console.error("❌ Failed to connect or sync DB:", err);
    }
})();
