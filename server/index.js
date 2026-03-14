const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const applianceRoutes = require('./routes/appliance');
const planRoutes = require('./routes/plan');
const knowledgeRoutes = require('./routes/knowledge');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/appliances', applianceRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/knowledge', knowledgeRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
