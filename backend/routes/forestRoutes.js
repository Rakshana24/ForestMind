const express = require("express");
const router = express.Router();
const { getForests } = require("../controllers/forestController");

router.get("/:districtName", getForests);

module.exports = router;
