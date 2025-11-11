const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());

const JWT_SECRET = 'super_secret_key';

mongoose.connect('mongodb://127.0.0.1:27017/mindconnect', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String
});

const User = mongoose.model('User', userSchema);

// REGISTER
app.post('/api/auth/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send('Missing fields');

  try {
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).send('User already exists');
    const hash = await bcrypt.hash(password, 10);
    await new User({ username, password: hash }).save();
    res.status(201).send('User registered');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// LOGIN
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).send('User not found');
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).send('Invalid password');
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, username: user.username });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
