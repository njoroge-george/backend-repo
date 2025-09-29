import express from "express";
import { addCoder, toggleMute, deleteCoder, getCoders } from "../controllers/coderController.js";

const router = express.Router();

router.get("/", getCoders); // <-- This enables GET /api/coders
router.post("/", addCoder);
router.patch("/:id/mute", toggleMute);
router.delete("/:id", deleteCoder);

export default router;