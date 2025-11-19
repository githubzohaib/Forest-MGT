import express from "express";
import Message from "../models/Message.js";
import User from "../models/user.js";
import authMiddleware from "../utils/authMiddleware.js";

const router = express.Router();

// GET messages with filters (pagination)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { toUser, fromUser, isBroadcast, limit = 20, skip = 0 } = req.query;

    const filter = {};

    if (toUser) filter.toUserId = toUser;
    if (fromUser) filter.fromUserId = fromUser;
    if (isBroadcast) filter.isBroadcast = isBroadcast === "true";

    // Rangers only see broadcast + their private chat
    if (req.user.role === "ranger") {
      filter.$or = [
        { isBroadcast: true },
        { toUserId: req.user._id },
        { fromUserId: req.user._id }
      ];
    }

    const messages = await Message.find(filter)
      .sort({ createdAt: -1 })
      .skip(parseInt(skip))
      .limit(parseInt(limit));

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark messages as read
router.post("/read", authMiddleware, async (req, res) => {
  try {
    const { messageId } = req.body;

    await Message.findByIdAndUpdate(messageId, {
      $addToSet: { readBy: req.user._id }
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;