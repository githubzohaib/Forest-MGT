const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authMiddleware = require('../utils/authMiddleware');

router.get('/', authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Only admin can view rangers" });
  }

  const rangers = await User.find({ role: "ranger" }).select("-passwordHash");
  res.json(rangers);
});

// DELETE ranger
router.delete("/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Only admin" });
  await User.findByIdAndDelete(req.params.id);
  res.sendStatus(200);
});

// UPDATE ranger
router.put("/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ error: "Only admin" });

  const { name, phone, email, password } = req.body;
  const updateData = { name, phone, email };
  if (password) updateData.password = password;

  const updatedRanger = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
  res.json(updatedRanger);
});

export default router;

