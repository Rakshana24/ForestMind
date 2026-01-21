const mongoose = require('mongoose');
require('dotenv').config();
const Alert = require('./models/Alert');

async function seedAlert() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        await Alert.create({
            alertType: "Intrusion",
            message: "Test Alert - System Check",
            office: "Valparai Range Office",
            cameraId: "TEST-CAM-01"
        });
        
        console.log("Seeded one test alert to 'forest_alerts'");
        mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
}

seedAlert();
