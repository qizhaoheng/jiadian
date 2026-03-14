const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const DATA_PATH = path.join(__dirname, '../data/knowledge.json');

async function readData() {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}

// GET /api/knowledge
router.get('/', async (req, res) => {
  try {
    const knowledge = await readData();
    res.json(knowledge);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });
  }
});

module.exports = router;