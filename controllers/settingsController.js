// controllers/settingsController.js
import Settings from "../models/Settings.js";

// Get user settings
export const getSettings = async (req, res) => {
    try {
        const { userId } = req.params;
        let settings = await Settings.findOne({ where: { userId } });

        if (!settings) {
            // create default settings if none exist
            settings = await Settings.create({ userId });
        }

        res.json({ success: true, data: settings });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update user settings
export const updateSettings = async (req, res) => {
    try {
        const { userId } = req.params;
        const updates = req.body;

        let settings = await Settings.findOne({ where: { userId } });

        if (!settings) {
            settings = await Settings.create({ userId, ...updates });
        } else {
            await settings.update(updates);
        }

        res.json({ success: true, data: settings });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
