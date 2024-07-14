import mongoose from "mongoose";

const Connection = async () => {
    const MongoDb_URI = process.env.MONGODB_URI;
    try {
        mongoose.connect(MongoDb_URI, { useUnifiedTopology: true });
        console.log(`Database coneected successfully`);
    } catch (error) {
        return console.log(`Error connecting Database`, error);
    }
};

export default Connection;
