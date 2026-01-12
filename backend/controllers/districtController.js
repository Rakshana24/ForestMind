const District = require("../models/District");

exports.getDistricts = async (req, res) => {
  const districts = await District.find();
  res.json(districts);
};
