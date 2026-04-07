// another file functions
import { connectToMongoDB } from '../init/connectToMongo';
import { scheduleDailyMidnightTasks } from '../utils/detectRecord';
import { config } from '../config/config';
import app from '../app'

export const startServer = async () =>
{
    const PORT = config.PORT || 5000;

    connectToMongoDB();

    app.listen(PORT, () => 
    { 
        console.log(`Server listen to http://localhost:${PORT}`);
    })

    scheduleDailyMidnightTasks();
}

if(config.STORAGE_TYPE === 'LOCAL')
{
    startServer();
}