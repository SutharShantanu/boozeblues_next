import mongoose from "mongoose";
// require('dotenv').config()
import "dotenv/config";
console.log(process.env);

const Connection = async () => {
    const MongoDb_URI = process.env.MONGODB_URI;
    console.log("MongoDb_URI:", MongoDb_URI);
  
  if (!MongoDb_URI) {
    throw new Error("MONGODB_URI environment variable is not set");
  }
  try {
    await mongoose.connect(MongoDb_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to Database:", error);
  }
};

export default Connection;
