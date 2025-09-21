import express from 'express';
import * as accountController from '../controllers/accountController.js';

const router = express.Router();

router.post('/register', accountController.registerAccount);
router.post('/login', accountController.loginAccount);
router.post('/deposit', accountController.authenticate, accountController.deposit);
router.post('/withdraw', accountController.authenticate, accountController.withdraw);
router.get('/balance', accountController.authenticate, accountController.getBalance);

export default router;