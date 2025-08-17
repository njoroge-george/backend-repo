// routes/portfolioRoutes.js
const express = require('express');
const router = express.Router();
const { getPortfolio, createPortfolio } = require('../controllers/portfolioController');

router.get('/', getPortfolio);
router.post('/', createPortfolio);

module.exports = router;
