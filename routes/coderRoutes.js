import express from 'express';
import { createCoder, getCoders } from '../controllers/coderController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createCoder); // Public registration
router.get('/', authenticate, getCoders); // Protected

export default router;
