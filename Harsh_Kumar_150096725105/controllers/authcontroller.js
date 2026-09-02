const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Counter = require('../models/counter');

async function nextId(name) {
  const counter = await Counter.findOneAndUpdate(
    { _id: name },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );
  return counter.value;
}

function createToken(user) {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '1d'
  });
}

async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ message: 'username, email and password are required' });
    if (password.length < 6) return res.status(400).json({ message: 'Password must contain at least 6 characters' });

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) return res.status(409).json({ message: 'Email is already registered' });

    const user = await User.create({
      _id: await nextId('users'),
      username,
      email: email.toLowerCase(),
      password: await bcrypt.hash(password, 10)
    });

    res.status(201).json({ message: 'Registration successful', token: createToken(user), user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'email and password are required' });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful', token: createToken(user), user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
}

module.exports = { register, login };
