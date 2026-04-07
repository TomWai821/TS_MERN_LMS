import mongoose from "mongoose";

export const connectTestDB = async () => 
{
    if (!process.env.MONGO_URI) 
    {
        throw new Error("MONGO_URI is not defined");
    }
    
    // 如果已經連線就不重複連線 (防止 Jest 多個檔案執行時報錯)
    if (mongoose.connection.readyState === 0) {
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