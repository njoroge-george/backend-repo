import express from "express";
import {
  createChallenge,
  getChallenges,
  getChallengeStats,
  markSolved,
  deleteChallenge,
} from "../controllers/challengeController.js";

import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// 📄 Get all challenges
router.get("/", authenticate, getChallenges);

// 📊 Get stats for a specific challenge
router.get("/:id/stats", authenticate, getChallengeStats);

// ➕ Create a new challenge (admin only)
router.post("/", authenticate, authorize("admin"), createChallenge);

// ✅ Mark challenge as solved (any authenticated user)
router.post("/solve", authenticate, markSolved);

// ❌ Delete challenge (admin only)
router.delete("/:id", authenticate, authorize("admin"), deleteChallenge);

export default router;
