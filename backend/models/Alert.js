const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  alertType: String,
  cameraId: String,
  office: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Alert", alertSchema);
