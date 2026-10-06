const router = require('express').Router();
const { records } = require('../db');
const { authenticate } = require('../middleware');

const delay = ms => new Promise(r => setTimeout(r, ms));

// GET /api/records?delay=ms  — returns records for logged-in user (or all for admin)
router.get('/', authenticate, async (req, res) => {
  const ms = parseInt(req.query.delay) || 0;
  await delay(ms);

  if (req.user.role === 'Admin') {
    const all = Object.entries(records).flatMap(([userId, recs]) =>
      recs.map(r => ({ ...r, userId }))
    );
    return res.json(all);
  }
  res.json(records[req.user.userId] || []);
});

module.exports = router;
