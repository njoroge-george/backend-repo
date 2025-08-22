import express from 'express';

import fitnessController from '../controllers/fitnessController.js';

const router = express.Router();
router.get('/', fitnessController.getAllFitnessEntries);
router.post('/', fitnessController.createFitnessEntry);
router.delete('/:id', fitnessController.deleteFitnessEntry);

export default router;
