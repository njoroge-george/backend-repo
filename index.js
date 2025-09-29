// backend-repo/App.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import sequelize from "./config/db.js";

// Load environment variables
dotenv.config();

// Constants
const PORT = process.env.PORT || 5001;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// ================== ROUTES ================== //
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
import roomRoutes from "./routes/roomRoutes.js";
import coderRoutes from "./routes/coderRoutes.js";
import challengeRoutes from "./routes/challengeRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import discussionRoutes from "./routes/discussionRoutes.js";

// ================== CONTROLLERS ================== //
import {
  handleJoin,
  handleMessage,
  handleTyping,
  handleDisconnect,
} from "./controllers/chatController.js";

// ================== EXPRESS APP ================== //
const app = express();
const server = http.createServer(app);

// ================== MIDDLEWARES ================== //
const allowedOrigins = [
  "http://localhost:5173",
  "https://njoroge.franbethfamily.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      const msg = `CORS policy does not allow access from origin: ${origin}`;
      console.error(`🚫 CORS Error: ${msg}`);
      return callback(new Error(msg));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Handle CORS errors
app.use((err, req, res, next) => {
  if (err.message.includes("CORS")) {
    res.status(403).json({ error: "CORS Error", message: err.message });
  } else {
    next(err);
  }
});

// ================== ROUTES REGISTRATION ================== //

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
  { path: "/api/rooms", route: roomRoutes },
  { path: "/api/coders", route: coderRoutes },
  { path: "/api/challenges", route: challengeRoutes },
  { path: "/api/submissions", route: submissionRoutes },
  { path: "/api/leaderboard", route: leaderboardRoutes },
  { path: "/api/discussions", route: discussionRoutes },
];

apiRoutes.forEach(({ path, route }) => app.use(path, route));

// ================== HEALTH CHECK & 404 ================== //
app.get("/api/health", (req, res) => res.json({ ok: true, time: new Date().toISOString() }));
app.use((req, res) => res.status(404).json({ success: false, message: "Not found" }));

// ================== SOCKET.IO ================== //
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

// --- CHAT NAMESPACE ---
const chatNamespace = io.of("/chat");
chatNamespace.on("connection", (socket) => {
  console.log("🟢 User connected to chat:", socket.id);

  socket.on("join", async ({ username, roomName }) => handleJoin(socket, { username, roomName }));
  socket.on("message", async (msg) => handleMessage(socket, msg));
  socket.on("typing", (data) => handleTyping(socket, data));
  socket.on("disconnect", async () => handleDisconnect(socket));
});

// // --- VOICE / DISCUSSION NAMESPACE ---
// io.of("/voice").on("connection", (socket) => {
//   console.log("🎙️ User connected to voice/discussion:", socket.id);

//   socket.on("joinRoom", async ({ coderId, roomId }) => {
//     const coder = await Coder.findByPk(coderId);
//     if (!coder) return socket.emit("error", { message: "Coder not found" });

//     const roomName = `room-${roomId}`;
//     socket.join(roomName);
//     socket.data = { coder, roomName };

//     io.of("/voice").to(roomName).emit("systemMessage", { message: `${coder.name} joined the room` });
//     io.of("/voice").to(roomName).emit("roomUpdate", await getParticipants(roomName, io.of("/voice")));
//   });

//   socket.on("leaveRoom", () => leaveRoom(socket, io.of("/voice")));
//   socket.on("toggleMute", ({ muted }) => toggleMute(socket, muted, io.of("/voice")));
//   socket.on("typing", () => sendTyping(socket, io.of("/voice")));
//   socket.on("stopTyping", () => stopTyping(socket, io.of("/voice")));
//   socket.on("message", ({ text }) => sendMessage(socket, text, io.of("/voice")));
//   socket.on("disconnect", () => leaveRoom(socket, io.of("/voice")));
// });

// ================== SOCKET HELPERS ================== //
async function getParticipants(roomName, namespace) {
  const clients = await namespace.in(roomName).fetchSockets();
  return clients.map((s) => s.data?.coder || { id: s.id, name: "Unknown" });
}

function leaveRoom(socket, namespace) {
  const { coder, roomName } = socket.data || {};
  if (!coder || !roomName) return;

  socket.leave(roomName);
  namespace.to(roomName).emit("systemMessage", { message: `${coder.name} left the room` });
  namespace.to(roomName).emit("roomUpdate", Array.from(namespace.in(roomName).sockets.keys()));
  socket.data = null;
}

function toggleMute(socket, muted, namespace) {
  if (!socket.data?.coder || !socket.data?.roomName) return;
  socket.data.coder.muted = muted;
  namespace.to(socket.data.roomName).emit("muteUpdate", socket.data.coder);
}

function sendTyping(socket, namespace) {
  if (!socket.data?.coder || !socket.data?.roomName) return;
  socket.to(socket.data.roomName).emit("typing", `${socket.data.coder.name} is typing...`);
}

function stopTyping(socket, namespace) {
  if (!socket.data?.roomName) return;
  socket.to(socket.data.roomName).emit("typing", "");
}

function sendMessage(socket, text, namespace) {
  if (!socket.data?.coder || !socket.data?.roomName) return;
  const msg = { user: socket.data.coder.name, text, timestamp: new Date() };
  namespace.to(socket.data.roomName).emit("message", msg);
}

// ================== START SERVER ================== //
(async () => {
  try {
    await sequelize.authenticate();
   sequelize.sync({ alter: true }); // only in dev!
    console.log("✅ Database connected.");
    server.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
  } catch (err) {
    console.error("❌ DB connection error:", err);
  }
})();
