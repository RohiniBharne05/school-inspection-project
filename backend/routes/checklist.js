const express = require('express');
const router = express.Router();
const Checklist = require('../models/Checklist');

// CREATE checklist
router.post('/', async (req, res) => {
  try {
    const checklist = new Checklist(req.body);
    await checklist.save();
    res.status(201).json(checklist);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ all checklists
router.get('/', async (req, res) => {
  try {
    const checklists = await Checklist.find();
    res.json(checklists);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE checklist by ID
router.delete('/:id', async (req, res) => {
  try {
    await Checklist.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
