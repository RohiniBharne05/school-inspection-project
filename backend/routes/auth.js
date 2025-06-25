const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../models/User');

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ error: "User not found" });

  const isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.status(401).json({ error: "Invalid password" });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token });
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

// Request password reset
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.sendStatus(404);
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET + user.password, { expiresIn: '1h' });
  const link = `${process.env.FRONTEND_URL}/reset-password/${user._id}/${token}`;
  await transporter.sendMail({ to: email, subject: 'Reset password', text: `Click here: ${link}` });
  res.json({ msg: 'Reset link sent' });
});

// Reset password
router.post('/reset-password/:id/:token', async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  const user = await User.findById(id);
  if (!user) return res.sendStatus(404);
  try {
    jwt.verify(token, process.env.JWT_SECRET + user.password);
    user.password = await bcrypt.hash(password, 10);
    await user.save();
    res.json({ msg: 'Password updated' });
  } catch {
    res.sendStatus(403);
  }
});

module.exports = router;
