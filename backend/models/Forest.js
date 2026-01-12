const mongoose = require("mongoose");

const forestSchema = new mongoose.Schema({
  forestName: { type: String, required: true },
  districtName: { type: String, required: true }
});

module.exports = mongoose.model("Forest", forestSchema);
