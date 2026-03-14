const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const USERS_PATH = path.join(__dirname, '../data/users.json');

async function readUsers() {
  try {
    const data = await fs.readFile(USERS_PATH, 'utf8');
    const parsed = JSON.parse(data);
    return Array.isArray(parsed.users) ? parsed.users : [];
  } catch (error) {
    return [];
  }
}

router.post('/', async (req, res) => {
  try {
    const identifier = req.body.identifier;
    const users = await readUsers();
    if (!identifier || !users.includes(identifier)) {
      return res.status(401).json({ success: false, error: 'Invalid identifier' });
    }
    res.json({ success: true, identifier });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Login failed' });
  }
});

module.exports = router;
