const mongoose = require("mongoose");

const CameraSchema = new mongoose.Schema({
    cameraId: { type: String, required: true },
    location: { type: String, required: true }
});

module.exports = mongoose.model("Camera", CameraSchema);
