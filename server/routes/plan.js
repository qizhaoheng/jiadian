const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const USERS_PATH = path.join(__dirname, '../data/users.json');
const DATA_DIR = path.join(__dirname, '../data/plans');

async function readUsers() {
  try {
    const data = await fs.readFile(USERS_PATH, 'utf8');
    const parsed = JSON.parse(data);
    return Array.isArray(parsed.users) ? parsed.users : [];
  } catch (error) {
    return [];
  }
}

async function getUserFilePath(identifier) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  return path.join(DATA_DIR, `${identifier}.json`);
}

async function readData(identifier) {
  const filePath = await getUserFilePath(identifier);
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    await fs.writeFile(filePath, JSON.stringify([], null, 2), 'utf8');
    return [];
  }
}

async function writeData(identifier, data) {
  const filePath = await getUserFilePath(identifier);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

async function validateIdentifier(identifier) {
  if (!identifier) return false;
  const users = await readUsers();
  return users.includes(identifier);
}

// GET /api/plans
router.get('/', async (req, res) => {
  try {
    const identifier = req.query.identifier;
    const valid = await validateIdentifier(identifier);
    if (!valid) {
      return res.status(401).json({ success: false, error: 'Invalid identifier' });
    }
    const plans = await readData(identifier);
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });
  }
});

// POST /api/plans
router.post('/', async (req, res) => {
  try {
    const identifier = req.body.identifier;
    const valid = await validateIdentifier(identifier);
    if (!valid) {
      return res.status(401).json({ success: false, error: 'Invalid identifier' });
    }
    const plans = await readData(identifier);
    const payload = req.body.plan ? req.body.plan : req.body;
    const { identifier: ignored, ...planData } = payload;
    const newPlan = {
      ...planData,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    };
    plans.push(newPlan);
    await writeData(identifier, plans);
    res.status(201).json(newPlan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// PUT /api/plans/:id
router.put('/:id', async (req, res) => {
  try {
    const identifier = req.body.identifier || req.query.identifier;
    const valid = await validateIdentifier(identifier);
    if (!valid) {
      return res.status(401).json({ success: false, error: 'Invalid identifier' });
    }
    const plans = await readData(identifier);
    const index = plans.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    const payload = req.body.plan ? req.body.plan : req.body;
    const { identifier: ignored, ...planData } = payload;
    plans[index] = { ...plans[index], ...planData, id: req.params.id };
    await writeData(identifier, plans);
    res.json(plans[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update data' });
  }
});

// DELETE /api/plans/:id
router.delete('/:id', async (req, res) => {
  try {
    const identifier = req.query.identifier || req.body.identifier;
    const valid = await validateIdentifier(identifier);
    if (!valid) {
      return res.status(401).json({ success: false, error: 'Invalid identifier' });
    }
    let plans = await readData(identifier);
    plans = plans.filter(p => p.id !== req.params.id);
    await writeData(identifier, plans);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete data' });
  }
});

module.exports = router;
