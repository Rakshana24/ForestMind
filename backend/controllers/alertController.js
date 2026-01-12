const Alert = require("../models/Alert");

exports.createAlert = async (req, res) => {
  const alert = await Alert.create(req.body);
  res.json(alert);
};

exports.getAlerts = async (req, res) => {
  const { office, date } = req.query;

  let filter = { office };

  if (date)
    filter.timestamp = { $gte: new Date(date) };

  const alerts = await Alert.find(filter).sort({ timestamp: -1 });
  res.json(alerts);
};
