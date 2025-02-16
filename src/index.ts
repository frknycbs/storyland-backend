
import app from './app';
import { connectDB } from './database/connectDB';
import addStory from './database/service/addStory';
import { Category } from './types';
import logger from './utils/logger';

const PORT = process.env.PORT || 3000;
const mongoURI = process.env.REMOTE_MONGO_URI || process.env.LOCAL_MONGO_URI || "";
app.listen(PORT, async () => {

    const funcName = "[STORYLAND-MAIN] "
    try {
        
        logger.info(funcName + `Started, connecting to mongoDB...`)
        await connectDB(mongoURI);

        logger.info(funcName + `Connected to mongoDB: ${mongoURI}, Server running on port ${PORT}`)
        
    } catch (error: any) {
        logger.info('Error: ' + error.message || error);
    }
}).on('error', (e: any) => logger.error(e));