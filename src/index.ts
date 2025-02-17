
import app from './app';
import { constants } from './assets/constants';
import { stories } from './assets/stories';
import { connectDB } from './database/connectDB';
import addStory from './database/service/addStory';
import { Category } from './types';
import logger from './utils/logger';

const PORT = process.env.PORT || null;
const mongoURI = process.env.REMOTE_MONGO_URI || null
app.listen(PORT, async () => {

    const funcName = "[STORYLAND-MAIN] "
    try {
        
        if(!mongoURI)
            throw("MongoDB URI not found.")

        if(!PORT)
            throw("Port not found.")

        logger.info(funcName + `Server running on port ${PORT}, connecting to mongoDB...`)
        const res: true | null = await connectDB(mongoURI);

        if(!res)
            throw("MongoDB connection failed.")

        logger.info(funcName + `Connected to mongoDB: ${mongoURI.split("@")[1]}`)

        
        for(const story of stories) {
            await addStory(story.name, story.text, story.title, story.category);
        }
        

    } catch (error: any) {
        logger.info(funcName + 'Error: ' + error);
    }
}).on('error', (e: any) => logger.error(e));