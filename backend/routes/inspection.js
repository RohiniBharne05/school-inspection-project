const router = require("express").Router();
const multer = require("multer");
const PDFDocument = require("pdfkit");
const ExcelJS = require("exceljs");
const Inspection = require("../models/Inspection");
const upload = multer({ dest: "uploads/" });
const School = require('../models/School');
const Planned = require('../models/PlannedInspection');

// Add plan
router.post('/plan', async (req, res) => {
  const plan = new Planned(req.body);
  await plan.save();
  res.json({ message: 'Planned inspection added', plan });
});

// Get all plans
router.get('/plan', async (req, res) => {
  const plans = await Planned.find().populate('schoolId inspectorId');
  res.json(plans);
});


router.post("/report", upload.single("photo"), async (req, res) => {
  const inspection = new Inspection({
    ...req.body,
    photo: req.file.filename,
    date: new Date()
  });
  await inspection.save();
  res.status(201).json({ message: "Report submitted" });
});

router.get("/reports", async (req, res) => {
  const { schoolId, inspectorId, date } = req.query;
  const query = {};
  if (schoolId) query.schoolId = schoolId;
  if (inspectorId) query.inspectorId = inspectorId;
  if (date) query.date = { $gte: new Date(date) };

  const reports = await Inspection.find(query).populate("schoolId").populate("inspectorId");
  res.json(reports);
});

// Export to PDF
router.get("/export/pdf", async (req, res) => {
  const inspections = await Inspection.find().populate("schoolId inspectorId");
  const doc = new PDFDocument();
  doc.pipe(res);
  inspections.forEach(i => {
    doc.text(`${i.schoolId.name} - ${i.inspectorId.name} - Rating: ${i.rating}`);
  });
  doc.end();
});

// Export to Excel
router.get("/export/excel", async (req, res) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Inspections");
  sheet.addRow(["School", "Inspector", "Rating", "Date"]);

  const data = await Inspection.find().populate("schoolId inspectorId");
  data.forEach(i => {
    sheet.addRow([i.schoolId.name, i.inspectorId.name, i.rating, i.date]);
  });

  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  await workbook.xlsx.write(res);
  res.end();
});


router.get('/dashboard/stats', async (req, res) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const total = await Inspection.countDocuments({ date: { $gte: thirtyDaysAgo } });
  const avgRating = await Inspection.aggregate([
    { $match: { date: { $gte: thirtyDaysAgo } } },
    { $group: { _id: null, avg: { $avg: "$rating" } } }
  ]);

  const topInspectors = await Inspection.aggregate([
    { $group: { _id: "$inspectorId", avgRating: { $avg: "$rating" }, count: { $sum: 1 } } },
    { $sort: { avgRating: -1, count: -1 } },
    { $limit: 1 }
  ]);

  res.json({ total, avgRating, topInspectors });
});


module.exports = router;
