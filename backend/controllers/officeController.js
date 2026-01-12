const Office = require("../models/Office");

exports.getOffices = async (req, res) => {
  const offices = await Office.find({ forestName: req.params.forestName });
  res.json(offices);
};
