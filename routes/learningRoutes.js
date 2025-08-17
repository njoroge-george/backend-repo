const express = require('express');
const router = express.Router();
const learningController = require('../controllers/learningController');

// Courses
router.get('/courses', learningController.getCourses);
router.post('/courses', learningController.createCourse);
router.put('/courses/:id', learningController.updateCourse);
router.delete('/courses/:id', learningController.deleteCourse);

// Achievements
router.get('/achievements', learningController.getAchievements);
router.post('/achievements', learningController.createAchievement);
router.put('/achievements/:id', learningController.updateAchievement);
router.delete('/achievements/:id', learningController.deleteAchievement);

// Resources
router.get('/resources', learningController.getResources);
router.post('/resources', learningController.createResource);
router.put('/resources/:id', learningController.updateResource);
router.delete('/resources/:id', learningController.deleteResource);

// Practice Logs
router.get('/practice-logs', learningController.getPracticeLogs);
router.post('/practice-logs', learningController.createPracticeLog);
router.put('/practice-logs/:id', learningController.updatePracticeLog);
router.delete('/practice-logs/:id', learningController.deletePracticeLog);

module.exports = router;
