const mongoose = require("mongoose");

const AlertReceiverSchema = new mongoose.Schema({
  officerName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  role: { type: String, required: true },
  office: { type: String, required: true },     // office name
  canReceiveAlerts: { type: Boolean, default: true }
});

module.exports = mongoose.model("AlertReceiver", AlertReceiverSchema);
