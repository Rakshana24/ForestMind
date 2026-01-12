const express = require("express");
const router = express.Router();
const { addCamera, getCameras, deleteCamera } = require("../controllers/cameraController");

router.post("/add", addCamera);
router.get("/", getCameras);
router.delete("/:id", deleteCamera);

module.exports = router;
