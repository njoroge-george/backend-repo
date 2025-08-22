import express from 'express';
import controller from '../controllers/achievementController.js';

const router = express.Router();

router.get('/', controller.getAchievements);
router.post('/',controller.addAchievement);

export default router;
