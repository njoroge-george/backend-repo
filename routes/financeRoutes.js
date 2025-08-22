// routes/financeRoutes.js
import express from 'express';

import financeController from '../controllers/financeController.js';

const router = express.Router();

router.post('/', financeController.saveEntry);
router.get('/', financeController.getEntries);
router.put('/:id', financeController.updateEntry); // ✅ update
router.delete('/:id', financeController.deleteEntry); // ✅ delete

export default router;