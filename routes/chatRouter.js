// routes/chatRouter.js
import { Router } from 'express';

const router = Router();

// Example REST endpoint (optional)
router.get('/history', (req, res) => {
    res.json({ status: 'ok', message: 'Use Socket.io for chat history.' });
});

export default router;