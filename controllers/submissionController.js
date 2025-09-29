import Submission from "../models/Submission.js";
import Coder from "../models/Coder.js";
import Challenge from "../models/Challenge.js";

// 🔌 Socket namespace reference
let io;
export const setSocket = (socketIO) => {
  io = socketIO;
};

// 🚀 Submit code
export const submitCode = async (req, res) => {
  try {
    const { coderId, challengeId, code, language } = req.body;
    if (!coderId || !challengeId || !code || !language) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const [coder, challenge] = await Promise.all([
      Coder.findByPk(coderId),
      Challenge.findByPk(challengeId),
    ]);

    if (!coder || !challenge) {
      return res.status(404).json({ error: "Coder or Challenge not found." });
    }

    // 🧪 Simulate test results
    const totalTests = 5;
    const passedTests = Math.floor(Math.random() * (totalTests + 1));
    const score = Math.round((passedTests / totalTests) * 100);
    const status = passedTests === totalTests ? "Accepted" : "Rejected";

    const submission = await Submission.create({
      coderId,
      challengeId,
      code,
      language,
      passedTests,
      totalTests,
      score,
      status,
      evaluatedAt: new Date(),
    });

    const fullSubmission = await Submission.findOne({
      where: { id: submission.id },
      include: [
        { model: Coder, attributes: ["id", "name"] },
        { model: Challenge, attributes: ["id", "title"] },
      ],
    });

    // 🔔 Emit to challenge room
    if (io) {
      io.to(`challenge_${challengeId}`).emit("newSubmission", fullSubmission);
    }

    res.status(201).json({
      message: "Submission received.",
      passedTests,
      totalTests,
      score,
      status,
      submission: fullSubmission,
    });
  } catch (err) {
    console.error("❌ Error submitting code:", err);
    res.status(500).json({ error: "Failed to submit code." });
  }
};

// 📄 Get submissions by coder
export const getSubmissionsByCoder = async (req, res) => {
  try {
    const { coderId } = req.params;
    const submissions = await Submission.findAll({
      where: { coderId },
      include: [{ model: Challenge, attributes: ["id", "title"] }],
      order: [["createdAt", "DESC"]],
    });
    res.json(submissions);
  } catch (err) {
    console.error("❌ Error fetching coder submissions:", err);
    res.status(500).json({ error: "Failed to fetch submissions." });
  }
};

// 📄 Get submissions by challenge
export const getSubmissionsByChallenge = async (req, res) => {
  try {
    const { challengeId } = req.params;
    const submissions = await Submission.findAll({
      where: { challengeId },
      include: [{ model: Coder, attributes: ["id", "name"] }],
      order: [["createdAt", "DESC"]],
    });
    res.json(submissions);
  } catch (err) {
    console.error("❌ Error fetching challenge submissions:", err);
    res.status(500).json({ error: "Failed to fetch submissions." });
  }
};

// ❌ Delete submission
export const deleteSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const submission = await Submission.findByPk(id);
    if (!submission) {
      return res.status(404).json({ error: "Submission not found." });
    }

    await submission.destroy();
    res.json({ message: "Submission deleted successfully." });
  } catch (err) {
    console.error("❌ Error deleting submission:", err);
    res.status(500).json({ error: "Failed to delete submission." });
  }
};

// 📊 Get analytics
export const getAnalytics = async (req, res) => {
  try {
    const [totalSubmissions, acceptedCount, totalScores] = await Promise.all([
      Submission.count(),
      Submission.count({ where: { status: "Accepted" } }),
      Submission.sum("score"),
    ]);

    const rejectedCount = totalSubmissions - acceptedCount;
    const avgScore = totalSubmissions ? totalScores / totalSubmissions : 0;

    res.json({
      totalSubmissions,
      acceptedCount,
      rejectedCount,
      averageScore: avgScore,
    });
  } catch (err) {
    console.error("❌ Error fetching analytics:", err);
    res.status(500).json({ error: "Failed to fetch analytics." });
  }
};

export const getSubmissionById = async (req, res) => {
  try {
    const { id } = req.params;
    const submission = await Submission.findOne({
      where: { id },
      include: [
        { model: Coder, attributes: ["id", "name"] },
        { model: Challenge, attributes: ["id", "title"] },
      ],
    });

    if (!submission) {
      return res.status(404).json({ error: "Submission not found." });
    }

    res.json(submission);
  } catch (err) {
    console.error("❌ Error fetching submission:", err);
    res.status(500).json({ error: "Failed to fetch submission." });
  }
};

export const reviewSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const { feedback, reviewedBy } = req.body;

    const submission = await Submission.findByPk(id);
    if (!submission) {
      return res.status(404).json({ error: "Submission not found." });
    }

    submission.feedback = feedback;
    submission.reviewedBy = reviewedBy;
    submission.reviewedAt = new Date();
    await submission.save();

    res.json({ message: "Submission reviewed.", submission });
  } catch (err) {
    console.error("❌ Error reviewing submission:", err);
    res.status(500).json({ error: "Failed to review submission." });
  }
};

export const retrySubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const original = await Submission.findByPk(id);

    if (!original) {
      return res.status(404).json({ error: "Original submission not found." });
    }

    const retry = await Submission.create({
      coderId: original.coderId,
      challengeId: original.challengeId,
      code: original.code,
      language: original.language,
      status: "Pending",
      evaluatedAt: null,
    });

    res.status(201).json({ message: "Retry created.", submission: retry });
  } catch (err) {
    console.error("❌ Error retrying submission:", err);
    res.status(500).json({ error: "Failed to retry submission." });
  }
};

