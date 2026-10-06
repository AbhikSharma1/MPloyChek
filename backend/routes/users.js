const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { users, records } = require('../db');
const { authenticate, requireAdmin } = require('../middleware');

const delay = ms => new Promise(r => setTimeout(r, ms));

// GET /api/users/me  — current user profile
router.get('/me', authenticate, (req, res) => {
  const user = users.find(u => u.userId === req.user.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const { password, ...safe } = user;
  res.json(safe);
});

// GET /api/users  — admin: list all users (supports ?delay=ms for async demo)
router.get('/', authenticate, requireAdmin, async (req, res) => {
  const ms = parseInt(req.query.delay) || 0;
  await delay(ms);
  res.json(users.map(({ password, ...u }) => u));
});

// POST /api/users  — admin: create user
router.post('/', authenticate, requireAdmin, (req, res) => {
  const { userId, password, name, email, department, role } = req.body;
  if (!userId || !password || !name || !role)
    return res.status(400).json({ message: 'userId, password, name and role are required' });
  if (users.find(u => u.userId === userId))
    return res.status(409).json({ message: 'User already exists' });

  const newUser = {
    id: uuidv4(), userId, password: bcrypt.hashSync(password, 10),
    name, email, department, role, status: 'Active', joinedDate: new Date().toISOString().split('T')[0]
  };
  users.push(newUser);
  records[userId] = [];
  const { password: _, ...safe } = newUser;
  res.status(201).json(safe);
});

// PUT /api/users/:userId  — admin: update user
router.put('/:userId', authenticate, requireAdmin, (req, res) => {
  const idx = users.findIndex(u => u.userId === req.params.userId);
  if (idx === -1) return res.status(404).json({ message: 'User not found' });
  const { password, ...updates } = req.body;
  if (password) users[idx].password = bcrypt.hashSync(password, 10);
  Object.assign(users[idx], updates);
  const { password: _, ...safe } = users[idx];
  res.json(safe);
});

// DELETE /api/users/:userId  — admin: delete user
router.delete('/:userId', authenticate, requireAdmin, (req, res) => {
  const idx = users.findIndex(u => u.userId === req.params.userId);
  if (idx === -1) return res.status(404).json({ message: 'User not found' });
  users.splice(idx, 1);
  res.json({ message: 'User deleted' });
});

module.exports = router;
