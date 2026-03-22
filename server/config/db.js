const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log(`Connecting to: ${process.env.MONGODB_URI.substring(0, 20)}...`);
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      family: 4
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
