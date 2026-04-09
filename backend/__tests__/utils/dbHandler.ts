import mongoose from "mongoose";

export const connectTestDB = async () => 
{
    if (!process.env.MONGO_URI) 
    {
        throw new Error("MONGO_URI is not defined");
    }
    
    if (mongoose.connection.readyState === 0) 
    {
        await mongoose.connect(process.env.MONGO_URI, 
        {
            serverSelectionTimeoutMS: 20000,
        });
    }
};

export const closeTestDB = async () => 
{
    await mongoose.connection.close();
};