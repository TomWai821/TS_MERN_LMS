// another file functions
import { connectToMongoDB } from '../init/connectToMongo';
import app from '../app'
import serverless from 'serverless-http';

let isConnected = false;

const prepare = async () => 
{
    if (!isConnected) 
    {
        await connectToMongoDB();
        isConnected = true;
    }
};

export const handler = async (event: any, context: any) => 
{
    context.callbackWaitsForEmptyEventLoop = false;

    await prepare(); 
    
    const h = serverless(app);
    return await h(event, context);
};