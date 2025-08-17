const Entry = require('../models/Entry');

exports.saveEntry = async (req, res) => {
  try {
    const { type, amount, category, description, date } = req.body;

    if (!type || !amount || !category) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    const entry = await Entry.create({
      type,
      amount,
      category,
      description: description || '',
      date,
    });

    res.status(201).json(entry);
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Fetch all entries
exports.getEntries = async (req, res) => {
  try {
    const entries = await Entry.findAll({ order: [['date', 'DESC']] });
    res.json(entries);
  } catch (err) {
    console.error('Error fetching entries:', err);
    res.status(500).json({ message: 'Failed to fetch entries.' });
  }
};

// ✅ Update an entry
exports.updateEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, amount, category, description, date } = req.body;

    const entry = await Entry.findByPk(id);
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found.' });
    }

    await entry.update({
      type,
      amount,
      category,
      description: description || '',
      date,
    });

    res.json(entry);
  } catch (err) {
    console.error('Error updating entry:', err);
    res.status(500).json({ message: 'Failed to update entry.' });
  }
};

// ✅ Delete an entry
exports.deleteEntry = async (req, res) => {
  try {
    const { id } = req.params;

    const entry = await Entry.findByPk(id);
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found.' });
    }

    await entry.destroy();
    res.json({ message: 'Entry deleted successfully.' });
  } catch (err) {
    console.error('Error deleting entry:', err);
    res.status(500).json({ message: 'Failed to delete entry.' });
  }
};
