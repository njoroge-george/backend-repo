// controllers/portfolioController.js
const Portfolio = require('../models/portfolioModel');

// Get portfolio data
exports.getPortfolio = async (req, res) => {
  try {
    const data = await Portfolio.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create portfolio entry
exports.createPortfolio = async (req, res) => {
  try {
    const { name, title, bio, skills, projects, contact_email } = req.body;
    const newPortfolio = await Portfolio.create({
      name,
      title,
      bio,
      skills,
      projects,
      contact_email
    });
    res.status(201).json(newPortfolio);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
