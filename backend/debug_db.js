const mongoose = require('mongoose');
require('dotenv').config();

async function inspectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to:", mongoose.connection.name);
        
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("Collections:", collections.map(c => c.name));
        
        const count = await mongoose.connection.db.collection('alerts').countDocuments();
        console.log(`Count in 'alerts': ${count}`);
        
        // Check for 'Alerts' or other variations
        const countCap = await mongoose.connection.db.collection('Alerts').countDocuments();
        if (countCap > 0) console.log(`Count in 'Alerts': ${countCap}`);

        // Check sample of 'alerts' to see if they match schema
        if (count > 0) {
            const sample = await mongoose.connection.db.collection('alerts').findOne({});
            console.log("Sample _id:", sample._id);
            console.log("Sample Keys:", Object.keys(sample));
            if (sample.blobType) console.log("WARNING: Found blobType in alert!");
        }

        mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
}

inspectDB();
