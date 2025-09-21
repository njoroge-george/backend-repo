import express from 'express';
import {
  getAllChallenges,
  getChallengeById,
  createChallenge,
  updateChallenge,
  deleteChallenge,
} from '../controllers/challengeController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticate, getAllChallenges);
router.get('/:id', authenticate, getChallengeById);
router.post('/', authenticate, authorize('admin'), createChallenge);
router.put('/:id', authenticate, authorize('admin'), updateChallenge);
router.delete('/:id', authenticate, authorize('admin'), deleteChallenge);

export default router;
