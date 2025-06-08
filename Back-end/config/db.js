require('dotenv').config();
const mongoose = require('mongoose');

if(!process.env.MONGODB_URI){
    console.log("Error : MONGODB_URI is not defined");
    process.exit(1);
}

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected Successfully");
    } catch (error){
        console.log("Error connecting to MongoDB: ", error);
        process.exit(1);
    }
};

module.exports = connectDB;