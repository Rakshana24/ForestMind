const AlertReceiver = require("../models/AlertReceiver");

exports.addReceiver = async (req, res) => {
  console.log("REQ BODY:", req.body);

  try {
    const { officerName, phoneNumber, role, office } = req.body;

    if (!officerName || !phoneNumber || !role || !office) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const receiver = new AlertReceiver({
      officerName,
      phoneNumber,
      role,
      office,
      canReceiveAlerts: true
    });

    await receiver.save();

    res.json({ message: "Receiver added", receiver });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getReceivers = async (req, res) => {
  try {
    const office = req.params.office;

    const receivers = await AlertReceiver.find({ office });
    res.json(receivers);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteReceiver = async (req, res) => {
  try {
    await AlertReceiver.findByIdAndDelete(req.params.id);
    res.json({ message: "Receiver deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
