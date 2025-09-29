import Leaderboard from "../models/Leaderboard.js";
import Coder from "../models/Coder.js";
import Challenge from "../models/Challenge.js";
import Room from "../models/Room.js";

export const getLeaderboard = async (req, res) => {
  try {
    const { roomId } = req.params;

    const entries = await Leaderboard.findAll({
      where: { RoomId: roomId },
      include: [Coder, Challenge],
    });

    res.json({ success: true, data: entries });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateLeaderboard = async (req, res, io) => {
  try {
    const { coderId, challengeId, roomId } = req.body;

    let entry = await Leaderboard.findOne({
      where: { CoderId: coderId, ChallengeId: challengeId, RoomId: roomId },
    });

    if (entry) {
      entry.solved += 1;
      await entry.save();
    } else {
      entry = await Leaderboard.create({
        CoderId: coderId,
        ChallengeId: challengeId,
        RoomId: roomId,
        solved: 1,
      });
    }

    // Broadcast update
    const coder = await Coder.findByPk(coderId);
    io.to(`leaderboard:${roomId}`).emit(`challengeSolved:${roomId}`, {
      challengeId,
      coder,
    });

    res.json({ success: true, data: entry });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
