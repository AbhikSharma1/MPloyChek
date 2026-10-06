const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users } = require('../db');
const { SECRET } = require('../middleware');

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { userId, password, role } = req.body;
  if (!userId || !password || !role)
    return res.status(400).json({ message: 'userId, password and role are required' });

  const user = users.find(u => u.userId === userId && u.role === role);
  if (!user || !bcrypt.compareSync(password, user.password))
    return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { id: user.id, userId: user.userId, name: user.name, role: user.role, email: user.email, department: user.department },
    SECRET,
    { expiresIn: '8h' }
  );
  res.json({
    token,
    user: { id: user.id, userId: user.userId, name: user.name, role: user.role, email: user.email, department: user.department, joinedDate: user.joinedDate }
  });
});

module.exports = router;
