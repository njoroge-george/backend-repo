import express from "express";
import {
    createChord,
    getChords,
    getChordById,
    updateChord,
    deleteChord,
} from "../controllers/chordController.js";

const router = express.Router();

router.post("/", createChord);   // ➕ POST /api/chords
router.get("/", getChords);      // 📄 GET /api/chords
router.get("/:id", getChordById); // 🔍 GET /api/chords/:id
router.put("/:id", updateChord);  // ✏️ PUT /api/chords/:id
router.delete("/:id", deleteChord); // 🗑️ DELETE /api/chords/:id

export default router;
