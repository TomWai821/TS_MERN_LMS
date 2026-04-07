import mongoose from "mongoose";
import { config } from "../config/config";

const MONGO_URI = config.MONGO_URI as string;

export const connectToMongoDB = async () => 
{
    try
    {
        mongoose.connect(MONGO_URI);
        console.log('Connect to mongoDB successfully!');
    }
    catch(error)
    {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}