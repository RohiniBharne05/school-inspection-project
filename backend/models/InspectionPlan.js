const mongoose = require('mongoose');
const planSchema = new mongoose.Schema({
  schoolId: String,
  inspectorId: String,
  scheduleDate: Date,
  checklist: [String]
});
module.exports = mongoose.model("InspectionPlan", planSchema);
