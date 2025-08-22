import express from 'express';
const router = express.Router();

import settingsController from '../controllers/settingsController.js';

const { getSettings, updateSettings, resetSettings } = settingsController;

// Use getSettings, updateSettings, resetSettings in your routes as before

router.get('/', getSettings);
router.put('/', updateSettings);
router.delete('/', resetSettings);

export default router;
