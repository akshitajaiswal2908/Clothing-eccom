const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');
require('dotenv').config();

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const adminData = {
      name,
      email,
      password: hashed,
      role: 'admin'
    };

    console.log('Creating admin user:', adminData);

    // Insert only the fields we want to allow
    const admin = await User.create(adminData, {
      fields: ['name', 'email', 'password', 'role']
    });

    res.status(201).json({ message: 'Signup successful', admin: { admin_id: admin.user_id, name: admin.name } });
  } catch (err) {
    res.status(500).json({ message: 'Error during signup', error: err.message });
  }
};
  
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await User.findOne({ where: { email, role: 'admin' } });
    if (!admin) return res.status(404).json({ message: 'User not found' });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(401).json({ message: 'Wrong password' });

    const token = jwt.sign({ id: admin.user_id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Error during login', error: err.message });
  }
};

