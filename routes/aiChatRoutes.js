import express from "express";
import { askAI, getChats, generateWorkoutImage } from "../controllers/aiChatController.js";

const router = express.Router();

router.get("/", getChats);
router.post("/ask", askAI);
router.post("/generate-image", generateWorkoutImage); // ✅ now defined

export default router;
