import express from 'express';
const router = express.Router();
import portfolioController from '../controllers/portfolioController.js';

const { getPortfolio, createPortfolio } = portfolioController;

router.get('/', getPortfolio);
router.post('/', createPortfolio);

export default router;