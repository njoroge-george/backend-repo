// controllers/accountController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Account from '../models/Account.js';

// Secret for JWT (consider using environment variables in production)
const JWT_SECRET = 'mytoken';

// Middleware for authentication
export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Invalid token' });
        req.accountId = decoded.accountId;
        next();
    });
};

// Register new account
export const registerAccount = async (req, res) => {
    const { accountNumber, name, pin } = req.body;
    try {
        const pinHash = await bcrypt.hash(pin, 10);
        const newAccount = await Account.create({ accountNumber, name, pin: pinHash });todos
        res.json({ message: 'Account created', account: newAccount });
    } catch (err) {
        res.status(400).json({ error: 'Registration failed', details: err.message });
    }
};

// Login to account
export const loginAccount = async (req, res) => {
    const { accountNumber, pin } = req.body;
    const account = await Account.findOne({ where: { accountNumber } });
    if (!account) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(pin, account.pin);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ accountId: account.id }, JWT_SECRET, { expiresIn: '3mins' });
    res.json({ token });
};

// Deposit funds
export const deposit = async (req, res) => {
    const { amount } = req.body;
    const account = await Account.findByPk(req.accountId);
    if (!account) return res.status(404).json({ error: 'Account not found' });

    account.balance += parseFloat(amount);
    await account.save();
    res.json({ message: 'Deposit successful', balance: account.balance });
};

// Withdraw funds
export const withdraw = async (req, res) => {
    const { amount } = req.body;
    const account = await Account.findByPk(req.accountId);
    if (!account) return res.status(404).json({ error: 'Account not found' });
    if (account.balance < parseFloat(amount))
        return res.status(400).json({ error: 'Insufficient funds' });

    account.balance -= parseFloat(amount);
    await account.save();
    res.json({ message: 'Withdrawal successful', balance: account.balance });
};

// Get account balance
export const getBalance = async (req, res) => {
    const account = await Account.findByPk(req.accountId);
    if (!account) return res.status(404).json({ error: 'Account not found' });
    res.json({ balance: account.balance });
};