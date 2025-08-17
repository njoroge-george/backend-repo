const express = require('express');
const router = express.Router();

const {
    getSettings,
    updateSettings,
    resetSettings
} = require('../controllers/settingsController');

router.get('/', getSettings);
router.put('/', updateSettings);
router.delete('/', resetSettings);

module.exports = router;
