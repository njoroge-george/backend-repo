import Submission from '../models/Submission.js';
import Coder from '../models/Coder.js';
import Challenge from '../models/Challenge.js';

// Submit a new code submission
export const submitCode = async (req, res) => {
  try {
    const { coderId, challengeId, code, language } = req.body;
    if (!coderId || !challengeId || !code || !language) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Verify that the coder exists
    const coder = await Coder.findByPk(coderId);
    if (!coder) {
      return res.status(400).json({ error: 'Invalid coderId: does not exist.' });
    }

    // Verify that the challenge exists
    const challenge = await Challenge.findByPk(challengeId);
    if (!challenge) {
      return res.status(400).json({ error: 'Invalid challengeId: does not exist.' });
    }

    // Simulate test results
    const totalTests = 5;
    const passedTests = Math.floor(Math.random() * (totalTests + 1)); // 0 to totalTests
    const score = Math.round((passedTests / totalTests) * 100);
    const status = passedTests === totalTests ? 'Accepted' : 'Rejected';

    // Create submission record
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

    // Fetch the full submission with associated data
    const fullSubmission = await Submission.findOne({
      where: { id: submission.id },
      include: [Coder, Challenge],
    });

    // Emit real-time event if namespace exists
    const codingNamespace = req.app.get('codingNamespace');
    if (codingNamespace) {
      codingNamespace.to(`challenge_${challengeId}`).emit('newSubmission', fullSubmission);
    }

    res.status(201).json({
      message: 'Submission received.',
      passedTests,
      totalTests,
      score,
      status,
      submission: fullSubmission,
    });
  } catch (err) {
    console.error('❌ Error submitting code:', err);
    res.status(500).json({ error: 'Failed to submit code.' });
  }
};

// Get all submissions by a specific coder
export const getSubmissionsByCoder = async (req, res) => {
  try {
    const { coderId } = req.params;
    const submissions = await Submission.findAll({
      where: { coderId },
      include: [Challenge],
      order: [['createdAt', 'DESC']],
    });
    res.json(submissions);
  } catch (err) {
    console.error('❌ Error fetching coder submissions:', err);
    res.status(500).json({ error: 'Failed to fetch submissions.' });
  }
};

// Get all submissions for a specific challenge
export const getSubmissionsByChallenge = async (req, res) => {
  try {
    const { challengeId } = req.params;
    const submissions = await Submission.findAll({
      where: { challengeId },
      include: [Coder],
      order: [['createdAt', 'DESC']],
    });
    res.json(submissions);
  } catch (err) {
    console.error('❌ Error fetching challenge submissions:', err);
    res.status(500).json({ error: 'Failed to fetch submissions.' });
  }
};

// Delete a submission by ID
export const deleteSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const submission = await Submission.findByPk(id);
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found.' });
    }

    await submission.destroy();
    res.json({ message: 'Submission deleted successfully.' });
  } catch (err) {
    console.error('❌ Error deleting submission:', err);
    res.status(500).json({ error: 'Failed to delete submission.' });
  }
};

// Get analytics data
export const getAnalytics = async (req, res) => {
  try {
    const totalSubmissions = await Submission.count();
    const acceptedCount = await Submission.count({ where: { status: 'Accepted' } });
    const rejectedCount = totalSubmissions - acceptedCount;

    const totalScores = await Submission.sum('score');
    const avgScore = totalSubmissions ? totalScores / totalSubmissions : 0;

    res.json({
      totalSubmissions,
      acceptedCount,
      rejectedCount,
      averageScore: avgScore,
    });
  } catch (err) {
    console.error('❌ Error fetching analytics:', err);
    res.status(500).json({ error: 'Failed to fetch analytics.' });
  }
};