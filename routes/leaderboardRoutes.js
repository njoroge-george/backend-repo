import express from "express";
import { getLeaderboard, updateLeaderboard } from "../controllers/leaderboardController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

export default (io) => {
  const router = express.Router();

  router.get("/:roomId", authenticate, authorize("admin"), getLeaderboard);
  router.post("/", authenticate, authorize("admin"), (req, res) => updateLeaderboard(req, res, io));

  return router;
};
