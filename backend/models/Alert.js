const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  alertType: String,
  cameraId: String,
  office: String,
  image: {
    data: Buffer,
    contentType: String
  },
  imageUrl: String,
  imagePath: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Alert", alertSchema, "forest_alerts");
