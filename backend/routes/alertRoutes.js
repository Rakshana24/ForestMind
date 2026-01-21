const express = require("express");
const router = express.Router();
const multer = require("multer");
const { createAlert, getAlerts } = require("../controllers/alertController");

// Multer setup for memory storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post("/", upload.single("image"), createAlert);
router.get("/", getAlerts);

module.exports = router;
