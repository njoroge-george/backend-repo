import Room from "../models/Room.js";
import Coder from "../models/Coder.js";

export const createRoom = async (req, res) => {
  try {
    const room = await Room.create({ name: req.body.name });
    res.json({ success: true, data: room });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll({ include: Coder });
    res.json({ success: true, data: rooms });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    await Room.destroy({ where: { id: req.params.id } });
    res.json({ success: true, message: "Room deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
