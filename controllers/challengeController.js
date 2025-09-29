import Challenge from "../models/Challenge.js";
import Room from "../models/Room.js";
import Coder from "../models/Coder.js";

let io;

export const setSocket = (socketIO) => {
  io = socketIO;
};

// ➕ Create Challenge
// ➕ Create Challenge
export const createChallenge = async (req, res) => {
  try {
    const {
      title,
      description,
      testcase,
      roomId,
      difficulty = "easy",
      tags = [],
    } = req.body;

    // 🔒 Validate required fields
    if (!title || !description || !testcase) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // 🔒 Validate RoomId
    const resolvedRoomId = roomId === "default" ? 1 : parseInt(roomId, 10);
    if (!Number.isInteger(resolvedRoomId)) {
      return res.status(400).json({ error: "Invalid RoomId." });
    }

    // ✅ Create challenge
    const challenge = await Challenge.create({
      title,
      description,
      testcase,
      difficulty,
      tags,
      roomId: resolvedRoomId,
    });

    // 📡 Emit socket event
    if (io) {
      io.to(`room-${resolvedRoomId}`).emit("challengeCreated", challenge);
    }

    res.json({ success: true, data: challenge });
  } catch (err) {
    console.error("Create challenge error:", err);
    res.status(500).json({ error: err.message });
  }
};

// 📄 Get all challenges with room + coders
export const getChallenges = async (req, res) => {
  try {
    const challenges = await Challenge.findAll({
      include: [
        { model: Room, attributes: ["id", "name"] },
        { model: Coder, attributes: ["id", "name"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json({ success: true, data: challenges });
  } catch (err) {
    console.error("Fetch challenges error:", err);
    res.status(500).json({ error: err.message });
  }
};

// 📊 Get challenge stats
export const getChallengeStats = async (req, res) => {
  try {
    const { id } = req.params;

    const challenge = await Challenge.findByPk(id);
    if (!challenge) {
      return res.status(404).json({ error: "Challenge not found." });
    }

    const total = await challenge.countCoders();
    const accepted = await challenge.countCoders({ where: { status: "Accepted" } }); // optional if status is tracked
    const rate = total ? (accepted / total) * 100 : 0;

    res.json({
      challengeId: id,
      attempts: challenge.attempts,
      successRate: challenge.successRate,
      totalSolvers: total,
      acceptedSolvers: accepted,
    });
  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ error: "Failed to fetch challenge stats." });
  }
};

// ✅ Mark challenge as solved
export const markSolved = async (req, res) => {
  try {
    const { coderId, challengeId } = req.body;

    const challenge = await Challenge.findByPk(challengeId);
    const coder = await Coder.findByPk(coderId);

    if (!challenge || !coder) {
      return res.status(404).json({ error: "Coder or Challenge not found" });
    }

    await challenge.addCoder(coder);

    challenge.attempts += 1;
    await challenge.save();

    if (io) {
      io.emit("challengeSolved", {
        challengeId,
        coder: { id: coder.id, name: coder.name },
      });
    }

    res.json({ success: true, message: "Challenge marked as solved" });
  } catch (err) {
    console.error("Mark solved error:", err);
    res.status(500).json({ error: err.message });
  }
};

// ❌ Delete challenge
export const deleteChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.findByPk(req.params.id);
    if (!challenge) {
      return res.status(404).json({ error: "Challenge not found" });
    }

    await challenge.destroy();

    if (io) {
      io.emit("challengeDeleted", { id: req.params.id });
    }

    res.json({ success: true, message: "Challenge deleted" });
  } catch (err) {
    console.error("Delete challenge error:", err);
    res.status(500).json({ error: err.message });
  }
};
