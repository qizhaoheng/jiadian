const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_PATH = path.join(__dirname, '../data/appliances.json');

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

// GET /api/appliances
router.get('/', async (req, res) => {
  try {
    const appliances = await readData();
    res.json(appliances);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read data' });
  }
});

// POST /api/appliances
router.post('/', async (req, res) => {
  try {
    const appliances = await readData();
    const newAppliance = {
      ...req.body,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    };
    appliances.push(newAppliance);
    await writeData(appliances);
    res.status(201).json(newAppliance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// PUT /api/appliances/:id
router.put('/:id', async (req, res) => {
  try {
    const appliances = await readData();
    const index = appliances.findIndex(a => a.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Appliance not found' });
    }
    appliances[index] = { ...appliances[index], ...req.body, id: req.params.id };
    await writeData(appliances);
    res.json(appliances[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update data' });
  }
});

// DELETE /api/appliances/:id
router.delete('/:id', async (req, res) => {
  try {
    let appliances = await readData();
    appliances = appliances.filter(a => a.id !== req.params.id);
    await writeData(appliances);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete data' });
  }
});

module.exports = router;