const express = require('express');
const router = express.Router();
const controller = require('../controllers/achievementController');


router.get('/', controller.getAchievements);
router.post('/',controller.addAchievement);

module.exports = router;
