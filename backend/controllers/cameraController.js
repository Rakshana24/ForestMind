const Camera = require("../models/Camera");

exports.addCamera = async (req, res) => {
    try {
        const { cameraId, location } = req.body;

        const newCam = new Camera({ cameraId, location });
        await newCam.save();

        res.json({ message: "Camera added", camera: newCam });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCameras = async (req, res) => {
    const cams = await Camera.find();
    res.json(cams);
};

exports.deleteCamera = async (req, res) => {
    await Camera.findByIdAndDelete(req.params.id);
    res.json({ message: "Camera deleted" });
};
