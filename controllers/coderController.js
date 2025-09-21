import Coder from '../models/Coder.js';

export const createCoder = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Name and email are required.' });

    const coder = await Coder.create({ name, email });
    res.status(201).json(coder);
  } catch (err) {
    console.error('Error creating coder:', err);
    res.status(500).json({ error: 'Server error while creating coder.' });
  }
};

export const getCoders = async (req, res) => {
  try {
    const coders = await Coder.findAll();
    res.json(coders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch coders.' });
  }
};
