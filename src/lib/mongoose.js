import mongoose from "mongoose";
import "dotenv/config";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectToDatabase = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands: false,
            bufferMaxEntries: 0,
        };

        cached.promise = mongoose
            .connect(MONGODB_URI, opts)
            .then((mongoose) => {
                console.log("Database connected successfully");
                console.log("Connected to DB:", mongoose.connection.db.databaseName);
                return mongoose;
            })
            .catch((error) => {
                console.error("Error connecting to Database:", error);
                throw error;
            });
    }
    cached.conn = await cached.promise;
    return cached.conn;
};

export default connectToDatabase;
