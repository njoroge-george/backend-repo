import Challenge from '../models/Challenge.js';
import Coder from '../models/Coder.js';

export const getAllChallenges = async (req, res) => {
  try {
    const { status } = req.query;
    const where = status ? { status } : {};

    const challenges = await Challenge.findAll({ where });
    res.json(challenges);
  } catch (err) {
    console.error('❌ Error fetching challenges:', err);
    res.status(500).json({ error: 'Failed to fetch challenges.' });
  }
};

export const getChallengeById = async (req, res) => {
  try {
    const { id } = req.params;
    const challenge = await Challenge.findByPk(id);

    if (!challenge) return res.status(404).json({ error: 'Challenge not found.' });
    res.json(challenge);
  } catch (err) {
    console.error('❌ Error fetching challenge:', err);
    res.status(500).json({ error: 'Failed to fetch challenge.' });
  }
};

export const createChallenge = async (req, res) => {
  try {
    const { title, description, difficulty, starterCode, tags, status, createdBy } = req.body;

    if (!title || !description || !createdBy) {
      return res.status(400).json({ error: 'Title, description, and creator are required.' });
    }

    const challenge = await Challenge.create({
      title,
      description,
      difficulty,
      starterCode,
      tags,
      status,
      createdBy,
    });

    res.status(201).json({ message: 'Challenge created.', challenge });
  } catch (err) {
    console.error('❌ Error creating challenge:', err);
    res.status(500).json({ error: 'Failed to create challenge.' });
  }
};

export const updateChallenge = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const challenge = await Challenge.findByPk(id);
    if (!challenge) return res.status(404).json({ error: 'Challenge not found.' });

    await challenge.update(updates);
    res.json({ message: 'Challenge updated.', challenge });
  } catch (err) {
    console.error('❌ Error updating challenge:', err);
    res.status(500).json({ error: 'Failed to update challenge.' });
  }
};

export const deleteChallenge = async (req, res) => {
  try {
    const { id } = req.params;
    const challenge = await Challenge.findByPk(id);
    if (!challenge) return res.status(404).json({ error: 'Challenge not found.' });

    await challenge.destroy();
    res.json({ message: 'Challenge deleted.' });
  } catch (err) {
    console.error('❌ Error deleting challenge:', err);
    res.status(500).json({ error: 'Failed to delete challenge.' });
  }
};
