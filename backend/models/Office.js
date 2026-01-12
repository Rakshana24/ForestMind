const mongoose = require("mongoose");

const officeSchema = new mongoose.Schema({
  officeName: { type: String, required: true },
  forestName: { type: String, required: true },
  location: { lat: Number, lng: Number },
  password: { type: String, required: true },
  role: String
});

module.exports = mongoose.model("Office", officeSchema);
