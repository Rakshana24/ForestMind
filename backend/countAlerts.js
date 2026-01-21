const mongoose = require('mongoose');
require('dotenv').config();
const Alert = require('./models/Alert');

async function countAlerts() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const count = await Alert.countDocuments({});
        console.log(`Total documents in 'alerts' collection: ${count}`);
        
        if (count > 0) {
            const first = await Alert.findOne({});
            console.log("First alert sample:", Object.keys(first.toObject()));
            console.log("Sample Data:", first);
        }
        
        mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
}

countAlerts();
