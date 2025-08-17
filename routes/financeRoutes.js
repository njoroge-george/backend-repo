// routes/financeRoutes.js
const express = require('express');
const router = express.Router();
const financeController = require('../controllers/financeController');

router.post('/', financeController.saveEntry);
router.get('/', financeController.getEntries);
router.put('/:id', financeController.updateEntry); // ✅ update
router.delete('/:id', financeController.deleteEntry); // ✅ delete

module.exports = router;