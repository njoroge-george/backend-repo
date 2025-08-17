const express = require('express');
const router = express.Router();
const controller = require('../controllers/practiceLogController');


router.get('/', controller.getLogs);
router.post('/', controller.addLog);

module.exports = router;
