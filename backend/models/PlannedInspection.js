const mongoose = require('mongoose');

const PlannedSchema = new mongoose.Schema({
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: 'School' },
  inspectorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inspector' },
  date: Date,
  checklist: [String],
  status: { type: String, enum: ['upcoming', 'completed'], default: 'upcoming' }
});

module.exports = mongoose.model('PlannedInspection', PlannedSchema);
