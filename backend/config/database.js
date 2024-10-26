const mongoose = require('mongoose');
require('dotenv').config();

const DBConnect = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,  // optional but recommended to avoid warnings
            useUnifiedTopology: true  // ensures proper behavior with the MongoDB driver's new connection management engine
        });
        console.log("✅ Database connected successfully.");
    } catch (err) {
        console.log("❌ Database not connected");
        console.log(err);
        process.exit(1);  // exiting with failure
    }
}

module.exports = DBConnect;