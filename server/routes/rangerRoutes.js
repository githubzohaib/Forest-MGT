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

module.exports = router;
