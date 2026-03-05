// packages
import dotenv from "dotenv";

// another file functions
import { connectToMongoDB } from './connectToMongo';
import { scheduleDailyMidnightTasks } from './detectRecord';
import app from './app'

dotenv.config({ debug: false });

const PORT = process.env.PORT || 5000;

connectToMongoDB();

app.listen(PORT, () => 
{ 
    console.log(`Server listen to http://localhost:${PORT}`);
})

scheduleDailyMidnightTasks();