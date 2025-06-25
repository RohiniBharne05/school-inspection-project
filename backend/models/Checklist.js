const mongoose = require('mongoose');
const ChecklistSchema = new mongoose.Schema({
  title: String,
  items: [String]
});
module.exports = mongoose.model('Checklist', ChecklistSchema);
