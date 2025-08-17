// controllers/learningController.js
const { Course, Resource, Achievement, PracticeLog } = require('../models/learningModel');

// --- COURSES ---
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });
    const course = await Course.create({ name, description });
    res.status(201).json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating course' });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description } = req.body;
    await Course.update({ name, description }, { where: { id } });
    const updated = await Course.findByPk(id);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating course' });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const id = req.params.id;
    await Course.destroy({ where: { id } });
    res.json({ message: 'Course deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting course' });
  }
};

// --- ACHIEVEMENTS ---
exports.getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.findAll();
    res.json(achievements);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching achievements' });
  }
};

exports.createAchievement = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    const achievement = await Achievement.create({ title, description });
    res.status(201).json(achievement);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating achievement' });
  }
};

exports.updateAchievement = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;
    await Achievement.update({ title, description }, { where: { id } });
    const updated = await Achievement.findByPk(id);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating achievement' });
  }
};

exports.deleteAchievement = async (req, res) => {
  try {
    const id = req.params.id;
    await Achievement.destroy({ where: { id } });
    res.json({ message: 'Achievement deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting achievement' });
  }
};

// --- RESOURCES ---
exports.getResources = async (req, res) => {
  try {
    const resources = await Resource.findAll();
    res.json(resources);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching resources' });
  }
};

exports.createResource = async (req, res) => {
  try {
    const { title, url } = req.body;
    if (!title || !url) return res.status(400).json({ error: 'Title and URL are required' });
    const resource = await Resource.create({ title, url });
    res.status(201).json(resource);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating resource' });
  }
};

exports.updateResource = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, url } = req.body;
    await Resource.update({ title, url }, { where: { id } });
    const updated = await Resource.findByPk(id);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating resource' });
  }
};

exports.deleteResource = async (req, res) => {
  try {
    const id = req.params.id;
    await Resource.destroy({ where: { id } });
    res.json({ message: 'Resource deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting resource' });
  }
};

// --- PRACTICE LOGS ---
exports.getPracticeLogs = async (req, res) => {
  try {
    const practiceLogs = await PracticeLog.findAll({
      order: [['date', 'DESC']]
    });
    res.json(practiceLogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching practice logs' });
  }
};

exports.createPracticeLog = async (req, res) => {
  try {
    const { activity, date } = req.body;
    if (!activity || !date) return res.status(400).json({ error: 'Activity and date are required' });
    const log = await PracticeLog.create({ activity, date });
    res.status(201).json(log);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating practice log' });
  }
};

exports.updatePracticeLog = async (req, res) => {
  try {
    const id = req.params.id;
    const { activity, date } = req.body;
    await PracticeLog.update({ activity, date }, { where: { id } });
    const updated = await PracticeLog.findByPk(id);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating practice log' });
  }
};

exports.deletePracticeLog = async (req, res) => {
  try {
    const id = req.params.id;
    await PracticeLog.destroy({ where: { id } });
    res.json({ message: 'Practice log deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting practice log' });
  }
};
