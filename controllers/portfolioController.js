// controllers/portfolioController.js
import Portfolio from '../models/portfolioModel.js';

const getPortfolio = async (req, res) => {
  try {
    const data = await Portfolio.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPortfolio = async (req, res) => {
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

export default {
  getPortfolio,
  createPortfolio
};