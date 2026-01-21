const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
app.use(express.json({ limit: "50mb" })); // Increased limit for Base64 images
app.use(cors());
app.use(express.urlencoded({ extended: true, limit: "50mb" })); 
connectDB();

app.use("/districts", require("./routes/districtRoutes"));
app.use("/forests", require("./routes/forestRoutes"));
app.use("/offices", require("./routes/officeRoutes"));
app.use("/uploads", express.static("uploads")); // Serve uploaded images
app.use("/auth", require("./routes/authRoutes"));
app.use("/alert-receivers", require("./routes/alertReceiverRoutes"));
app.use("/alerts", require("./routes/alertRoutes"));
app.use("/cameras", require("./routes/cameraRoutes"));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
