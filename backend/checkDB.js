const mongoose = require('mongoose');
require('dotenv').config();

const Alert = require('./models/Alert');

async function checkAlerts() {
    try {
        console.log("Connecting to DB...");
        await mongoose.connect(process.env.MONGO_URI);
        
        // Find the LATEST alert
        const latestAlert = await Alert.findOne({}).sort({ timestamp: -1 });
        
        if (latestAlert) {
            console.log("Latest Alert ID:", latestAlert._id);
            if (latestAlert.imagePath) {
                console.log("VALUE OF imagePath:", latestAlert.imagePath);
            } else {
                console.log("No imagePath field found.");
            }
            
            if (latestAlert.imageUrl) {
                console.log("VALUE OF imageUrl:", latestAlert.imageUrl);
            }

        } else {
            console.log("No alerts found.");
        }

        mongoose.connection.close();
    } catch (err) {
        console.error("Error:", err);
    }
}

checkAlerts();
