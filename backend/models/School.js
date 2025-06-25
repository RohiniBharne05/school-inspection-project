const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  name: String,
  address: String,
  contact: String,
  location: String,
  coordinates: {
    lat: Number,
    lng: Number
  }
});

module.exports = mongoose.model("School", schoolSchema);
