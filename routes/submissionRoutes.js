import express from 'express';
import {
  submitCode,
  getSubmissionsByCoder,
  getSubmissionsByChallenge,
  deleteSubmission,
  getAnalytics
} from '../controllers/submissionController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, submitCode);

router.get('/coder/:coderId', authenticate, getSubmissionsByCoder);
router.get('/challenge/:challengeId', authenticate, getSubmissionsByChallenge);
router.delete('/:id', authenticate, authorize('admin'), deleteSubmission);
router.get('/analytics', authenticate, authorize('admin'), getAnalytics);

export default router;