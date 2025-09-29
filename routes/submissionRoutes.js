import express from "express";
import {
  submitCode,
  getSubmissionsByCoder,
  getSubmissionsByChallenge,
  getSubmissionById,
  reviewSubmission,
  retrySubmission,
  deleteSubmission,
  getAnalytics,
} from "../controllers/submissionController.js";

import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🚀 Submit code
router.post("/", authenticate, submitCode);

// 📄 Get submissions
router.get("/coder/:coderId", authenticate, getSubmissionsByCoder);
router.get("/challenge/:challengeId", authenticate, getSubmissionsByChallenge);
router.get("/:id", authenticate, getSubmissionById);

// 📝 Admin review
router.post("/:id/review", authenticate, authorize("admin"), reviewSubmission);

// 🔁 Retry submission
router.post("/:id/retry", authenticate, retrySubmission);

// ❌ Delete submission
router.delete("/:id", authenticate, authorize("admin"), deleteSubmission);

// 📊 Analytics
router.get("/analytics", authenticate, authorize("admin"), getAnalytics);

export default router;
