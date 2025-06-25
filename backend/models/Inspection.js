const express = require('express');
const router = express.Router();

const Planned = require('../models/PlannedInspection');

router.post('/plan', async (req, res) => {
  try {
    const plan = new Planned(req.body);
    await plan.save();
    res.status(201).json(plan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
