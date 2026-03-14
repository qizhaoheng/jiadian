const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_PATH = path.join(__dirname, '../data/plans.json');

async function readData() {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeData(data) {
  await fs.writeFile(DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
}

// GET /api/plans
router.get('/', async (req, res) => {
  try {
    const plans = await readData();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });
  }
});

// POST /api/plans
router.post('/', async (req, res) => {
  try {
    const plans = await readData();
    const newPlan = {
      ...req.body,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    };
    plans.push(newPlan);
    await writeData(plans);
    res.status(201).json(newPlan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// PUT /api/plans/:id
router.put('/:id', async (req, res) => {
  try {
    const plans = await readData();
    const index = plans.findIndex(p => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Plan not found' });
    }
    plans[index] = { ...plans[index], ...req.body, id: req.params.id };
    await writeData(plans);
    res.json(plans[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update data' });
  }
});

// DELETE /api/plans/:id
router.delete('/:id', async (req, res) => {
  try {
    let plans = await readData();
    plans = plans.filter(p => p.id !== req.params.id);
    await writeData(plans);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete data' });
  }
});

module.exports = router;