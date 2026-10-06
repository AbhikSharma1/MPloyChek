const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'mploychek_secret_key';

const authenticate = (req, res, next) => {
  const auth = req.headers['authorization'];
  if (!auth) return res.status(401).json({ message: 'No token provided' });
  const token = auth.split(' ')[1];
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'Admin') return res.status(403).json({ message: 'Admin access required' });
  next();
};

module.exports = { authenticate, requireAdmin, SECRET };
