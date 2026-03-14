const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const DATA_PATH = path.join(__dirname, '../data/knowledge.json');
const USERS_PATH = path.join(__dirname, '../data/users.json');

async function readData() {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}

async function readUsers() {
  try {
    const data = await fs.readFile(USERS_PATH, 'utf8');
    const parsed = JSON.parse(data);
    return Array.isArray(parsed.users) ? parsed.users : [];
  } catch (error) {
    return [];
  }
}

async function validateIdentifier(identifier) {
  if (!identifier) return false;
  const users = await readUsers();
  return users.includes(identifier);
}

// GET /api/knowledge
router.get('/', async (req, res) => {
  try {
    const identifier = req.query.identifier;
    const valid = await validateIdentifier(identifier);
    if (!valid) {
      return res.status(401).json({ success: false, error: 'Invalid identifier' });
    }
    const knowledge = await readData();
    res.json(knowledge);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });
  }
});

module.exports = router;
