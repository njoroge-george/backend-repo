import Coder from "../models/Coder.js";
import Room from "../models/Room.js";

export const addCoder = async (req, res) => {
  try {
    const { name, avatar, roomId } = req.body;
    const coder = await Coder.create({ name, avatar, RoomId: roomId });
    res.json({ success: true, data: coder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const toggleMute = async (req, res) => {
  try {
    const coder = await Coder.findByPk(req.params.id);
    if (!coder) return res.status(404).json({ error: "Coder not found" });

    coder.muted = !coder.muted;
    await coder.save();

    res.json({ success: true, data: coder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteCoder = async (req, res) => {
  try {
    await Coder.destroy({ where: { id: req.params.id } });
    res.json({ success: true, message: "Coder removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ADD THIS FUNCTION:
export const getCoders = async (req, res) => {
  try {
    const coders = await Coder.findAll();
    res.json({ success: true, data: coders });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};