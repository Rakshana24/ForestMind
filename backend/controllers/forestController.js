const Forest = require("../models/Forest");

exports.getForests = async (req, res) => {
  const forests = await Forest.find({ districtName: req.params.districtName });
  res.json(forests);
};
