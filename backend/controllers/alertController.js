const Alert = require("../models/Alert");

exports.createAlert = async (req, res) => {
  try {
    const { alertType, cameraId, office, message } = req.body;
    let alertData = { alertType, cameraId, office, message };

    // Handle Image Upload
    // Handle Image Upload
    if (req.file) {
      alertData.imagePath = req.file.path;
      alertData.imageUrl = `http://localhost:5000/${req.file.path.replace(/\\/g, "/")}`; // Store full URL for convenience
    }

    const alert = await Alert.create(alertData);
    res.json(alert);
  } catch (err) {
    console.error("Error creating alert:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAlerts = async (req, res) => {
  const { office, date } = req.query;

  let filter = {};

  if (office) {
    filter.office = office;
  }

  if (date)
    filter.timestamp = { $gte: new Date(date) };

  const alerts = await Alert.find(filter).sort({ timestamp: -1 });

  // Convert Buffer to Base64 for frontend
  const formattedAlerts = alerts.map(alert => {
    let imageUrl = null;
    if (alert.image && alert.image.data) {
      const base64 = alert.image.data.toString('base64');
      imageUrl = `data:${alert.image.contentType};base64,${base64}`;
    } else if (alert.imageUrl) {
        // Fallback for string-based images (URL)
        imageUrl = alert.imageUrl; 
    } else if (alert.imagePath) {
        // Fallback for local path (mapped to static route)
        // Ensure path uses forward slashes and points to /uploads
        let cleanPath = alert.imagePath.replace(/\\/g, "/"); 
        if (!cleanPath.startsWith("/")) cleanPath = "/" + cleanPath;
        if (!cleanPath.startsWith("/uploads") && !cleanPath.includes("uploads")) {
             cleanPath = "/uploads" + cleanPath;
        }
        imageUrl = `http://localhost:5000${cleanPath}`; // TODO: Use dynamic host if possible
    }

    return {
      _id: alert._id,
      alertType: alert.alertType,
      cameraId: alert.cameraId,
      office: alert.office,
      message: alert.message,
      timestamp: alert.timestamp,
      imageUrl: imageUrl // Frontend expects this key
    };
  });

  res.json(formattedAlerts);
};
