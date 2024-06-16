const express = require("express");
const cors = require('cors');
require('dotenv').config();
const { getAlertsInfo, getPriorityInfo } = require('./api');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({
  origin: [process.env.FRONT],
  credentials: true
}));

app.use(express.json());

app.get("/alerts", async (req, res) => {
  const alerts = getAlertsInfo();
  res.json({ alerts });
});

app.get("/priority", async (req, res) => {
  const priority = await getPriorityInfo();
  res.json({ priority });
});

app.post('/create', (req, res) => {
  const { title } = req.body;
  res.json({message: `Alert ${title} created successfully!`});
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});