import { Discussion, DiscussionReply, DiscussionLike, Coder } from "../models/app.js";

// 🧠 Get all discussions for a challenge (with author, replies, likes)
export const getDiscussions = async (req, res) => {
  try {
    const { challengeId } = req.params;

    const discussions = await Discussion.findAll({
      where: { challengeId },
      include: [
        { model: Coder, as: "author", attributes: ["id", "name", "avatar"] },
        {
          model: DiscussionReply,
          as: "replies",
          include: [{ model: Coder, as: "author", attributes: ["id", "name", "avatar"] }],
        },
        {
          model: DiscussionLike,
          as: "likes",
          include: [{ model: Coder, as: "liker", attributes: ["id", "name", "avatar"] }],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    // Convert likes to have coderId for frontend
    const data = discussions.map(discussion => {
      const obj = discussion.toJSON();
      obj.likes = (obj.likes || []).map(like =>
        like.liker ? { coderId: like.liker.id } : { coderId: like.coderId }
      );
      obj.replies = (obj.replies || []).map(reply => ({
        ...reply,
        author: reply.author || null
      }));
      return obj;
    });

    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 📝 Create a new discussion
export const createDiscussion = async (req, res) => {
  try {
    const { challengeId } = req.params;
    const { coderId, title, body } = req.body;

    const discussion = await Discussion.create({ challengeId, coderId, title, body });
    // Optionally, include author info
    const created = await Discussion.findByPk(discussion.id, {
      include: [{ model: Coder, as: "author", attributes: ["id", "name", "avatar"] }],
    });
    res.json({ success: true, data: created });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 💬 Add a reply to a discussion
export const addReply = async (req, res) => {
  try {
    const { discussionId } = req.params;
    const { coderId, body } = req.body;

    const reply = await DiscussionReply.create({ discussionId, coderId, body });
    const created = await DiscussionReply.findByPk(reply.id, {
      include: [{ model: Coder, as: "author", attributes: ["id", "name", "avatar"] }],
    });
    res.json({ success: true, data: created });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ❤️ Toggle like/unlike on a discussion
export const toggleLikeDiscussion = async (req, res) => {
  try {
    const { discussionId } = req.params;
    const { coderId } = req.body;

    const existing = await DiscussionLike.findOne({ where: { discussionId, coderId } });

    if (existing) {
      await existing.destroy();
      return res.json({ success: true, liked: false });
    }

    await DiscussionLike.create({ discussionId, coderId });
    res.json({ success: true, liked: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 🧑‍💻 Get all coders
export const getCoders = async (req, res) => {
  try {
    const coders = await Coder.findAll({
      attributes: ["id", "name", "avatar"]
    });
    res.json({ success: true, data: coders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✏️ Update coder avatar
export const updateCoderAvatar = async (req, res) => {
  try {
    const { coderId } = req.params;
    const { avatar } = req.body;
    const coder = await Coder.findByPk(coderId);
    if (!coder) return res.status(404).json({ success: false, error: "Coder not found" });
    coder.avatar = avatar;
    await coder.save();
    res.json({ success: true, data: coder });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// 🗑️ Delete a discussion
export const deleteDiscussion = async (req, res) => {
  try {
    const { discussionId } = req.params;

    const discussion = await Discussion.findByPk(discussionId);
    if (!discussion) {
      return res.status(404).json({ success: false, error: "Discussion not found" });
    }

    await discussion.destroy();
    res.json({ success: true, message: "Discussion deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};