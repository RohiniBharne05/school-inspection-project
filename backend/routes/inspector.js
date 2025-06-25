const router = require("express").Router();
const Inspector = require("../models/Inspector");

router.post("/", async (req, res) => {
  const inspector = new Inspector(req.body);
  await inspector.save();
  res.status(201).json(inspector);
});

router.get("/", async (req, res) => {
  const inspectors = await Inspector.find().populate("assignedSchools");
  res.json(inspectors);
});

module.exports = router;
