const express = require("express");
const router = express.Router();
const School = require("../models/School");

// POST /api/schools
router.post("/", async (req, res) => {
  console.log("➡️  POST /api/schools called with body:", req.body);

  try {
    const school = new School(req.body);
    await school.save();
    res.status(201).json(school);
  } catch (err) {
    console.error("Error saving school:", err.message);
    res.status(500).json({ error: "Failed to save school" });
  }
});

// GET /api/schools
router.get("/", async (req, res) => {
  const schools = await School.find();
  res.json(schools);
});

module.exports = router;
