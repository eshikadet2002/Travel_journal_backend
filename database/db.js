const mongoose = require('mongoose');
require('dotenv').config();


const mongoDB = async () => {
    try {
        await mongoose.connect(process.env.DB_PASSKEY);
        console.log('---- DB Connected ----');
    } catch (error) {
        console.error('---- DB Connection Error ----', error.message);
        process.exit(1); 
    }
};

module.exports = mongoDB;
