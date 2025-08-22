import Fitness from '../models/Fitness.js';

 const getAllFitnessEntries = async (req, res) => {
    try {
        const entries = await Fitness.findAll();
        res.json(entries);
    } catch (error) {
        console.error('Error fetching fitness entries:', error);
        res.status(500).json({ error: 'Failed to get fitness entries' });
    }
};

 const createFitnessEntry = async (req, res) => {
    const { workout_type, duration, workout_date, calories, reps, date, name } = req.body;
    try {
        const entry = await Fitness.create({
            workout_type,
            duration,
            workout_date,
            calories,
            reps,
            date,
            name
        });
        res.status(201).json(entry);
    } catch (error) {
        console.error('Error creating fitness entry:', error);
        res.status(500).json({ error: error.message });
    }
};

 const deleteFitnessEntry = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Fitness.destroy({ where: { id } });
        if (!deleted) {
            return res.status(404).json({ error: 'Fitness entry not found' });
        }
        res.json({ message: 'Fitness entry deleted' });
    } catch (error) {
        console.error('Error deleting fitness entry:', error);
        res.status(500).json({ error: 'Failed to delete fitness entry' });
    }
};

 export default {
    getAllFitnessEntries,
    createFitnessEntry,
    deleteFitnessEntry
 };