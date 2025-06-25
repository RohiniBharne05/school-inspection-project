const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const checklistRoutes = require('./routes/checklist');
const schoolRoutes = require('./routes/school');
require("dotenv").config();
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/school', require('./routes/school'));
app.use('/api/inspector', require('./routes/inspector'));
app.use('/api/inspection', require('./routes/inspection'));
app.use('/api/checklists', checklistRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected...");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
