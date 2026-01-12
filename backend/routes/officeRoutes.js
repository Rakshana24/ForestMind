const express = require("express");
const router = express.Router();
const { getOffices } = require("../controllers/officeController");

router.get("/:forestName", getOffices);

module.exports = router;
