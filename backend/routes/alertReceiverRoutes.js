const express = require("express");
const router = express.Router();
const {
  addReceiver,
  deleteReceiver,
  getReceivers
} = require("../controllers/alertReceiverController");

router.post("/add", addReceiver);
router.get("/:office", getReceivers);
router.delete("/:id", deleteReceiver);

module.exports = router;
