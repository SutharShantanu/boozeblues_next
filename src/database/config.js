import mongoose from "mongoose";
import "dotenv/config";

const Connection = async () => {
    const MongoDb_URI = process.env.MONGODB_URI;

    if (!MongoDb_URI) {
        throw new Error("MONGODB_URI environment variable is not set");
    }
    try {
        await mongoose.connect(MongoDb_URI, {
            useUnifiedTopology: true,
        });
        console.log("Database connected successfully");
        console.log("Connected to DB:", mongoose.connection.db.databaseName);
    } catch (error) {
        console.error("Error connecting to Database:", error);
    }
};

export default Connection;
