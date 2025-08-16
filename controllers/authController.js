const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    res.status(201).json({ message: 'Signup successful', user: { id: user.user_id, name: user.name } });
  } catch (err) {
    res.status(500).json({ message: 'Error during signup', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Wrong password' });

    const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Error during login', error: err.message });
  }
};

// Google login successful
exports.googleSuccess = (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Google authentication failed' });

  const user = req.user;
  const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.json({
    message: 'Google login successful',
    token,
    user: { id: user.user_id, name: user.name, email: user.email }
  });
};

// Facebook login successful
// exports.facebookSuccess = (req, res) => {
//   if (!req.user) return res.status(401).json({ message: 'Facebook authentication failed' });

//   const user = req.user;
//   const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1d' });

//   res.json({
//     message: 'Facebook login successful',
//     token,
//     user: { id: user.user_id, name: user.name, email: user.email }
//   });
// };
