import mongoose from 'mongoose'

const mongooseURI = 'mongodb://127.0.0.1:27017';

export const connectToMongoDB = async () => 
{
    try
    {
        mongoose.connect(mongooseURI);
        console.log('Connect to mongoDB successfully!');
    }
    catch(error)
    {
        console.error('Error connecting to MongoDB:', error);
    }
}