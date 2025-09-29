import express from "express";
import { getDiscussions, createDiscussion, addReply, toggleLikeDiscussion, deleteDiscussion, getCoders } from "../controllers/discussionController.js";

const router = express.Router();

router.get("/challenges/:challengeId/discussions", getDiscussions);
router.post("/challenges/:challengeId/discussions", createDiscussion);
router.post("/discussions/:discussionId/replies", addReply);
router.post("/discussions/:discussionId/like", toggleLikeDiscussion);
router.delete("/discussions/:discussionId", deleteDiscussion);
router.get("/coders", getCoders); // <- optionally here

export default router;