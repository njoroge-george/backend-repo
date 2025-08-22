import express from 'express';
const router = express.Router();
import controller from '../controllers/practiceLogController.js';


router.get('/', controller.getLogs);
router.post('/', controller.addLog);

export default router;
