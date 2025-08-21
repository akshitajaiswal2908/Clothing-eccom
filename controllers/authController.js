const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { sendVerificationEmai , sendResetPasswordEmail } = require('../config/mailer');
require('dotenv').config();

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      isVerified: false
    });

    const token = jwt.sign({ id: newUser.user_id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    await sendVerificationEmail(email, token);

    res.status(201).json({ message: 'Signup successful, please verify your email.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const token = decodeURIComponent(req.params.token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) return res.status(400).json({ message: 'Invalid token' });
    if (user.isVerified) return res.json({ message: 'Email already verified' });

    user.isVerified = true;
    await user.save();

    res.json({ message: 'Email verified successfully, you can now login.' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Wrong password' });
    if (!user.isVerified) return res.status(401).json({ message: 'Please verify your email first' });

    const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Error during login', error: err.message });
  }
};

exports.googleSuccess = (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Google authentication failed' });

  const user = req.user;
  const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.json({
    message: 'Google login successful',
    token,
    user: { id: user.user_id, name: user.name, email: user.email }
  });
};

exports.facebookSuccess = (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Facebook authentication failed' });

  const user = req.user;
  const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.json({
    message: 'Facebook login successful',
    token,
    user: { id: user.user_id, name: user.name, email: user.email }
  });
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    await sendResetPasswordEmail(email, token);

    res.json({ message: 'Password reset link sent to your email' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const token = decodeURIComponent(req.params.token);
    const { newPassword } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(404).json({ message: 'Invalid token or user not found' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password reset successful, you can now login.' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};
