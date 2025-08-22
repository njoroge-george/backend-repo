// backend-repo/routes/courseRoutes.js
import express from 'express';
import CourseController from '../controllers/courseController.js';

const router = express.Router();

router.get('/', CourseController.getCourses);
router.post('/', CourseController.addCourse);

export default router;