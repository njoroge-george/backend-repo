const express = require('express');
const router = express.Router();
const fitnessController = require('../controllers/fitnessController');

router.get('/', fitnessController.getAllFitnessEntries);
router.post('/', fitnessController.createFitnessEntry);
router.delete('/:id', fitnessController.deleteFitnessEntry);

module.exports = router;
