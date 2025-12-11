import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        // Remove trailing slash from MONGODB_URL if present
        // const mongoUrl = process.env.MONGODB_URL.replace(/\/$/, '');
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(connectionInstance);
        

        console.log("MongoDB Connected at host : ", connectionInstance.connection.host);
        console.log("Database name : ", connectionInstance.connection.name);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

export default connectDB;