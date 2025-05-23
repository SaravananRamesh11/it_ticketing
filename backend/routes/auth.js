const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/login', async (req, res) => {
  const { ename, eid } = req.body;
  try {
    const user = await User.findOne({ employeeName: ename, employeeId: eid });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    res.json({ role: user.role });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;