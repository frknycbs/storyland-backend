
import app from './app';
import { connectDB } from './database/connectDB';
import addStory from './database/service/addStory';
import addStoryAudio from './database/service/addStoryAudio';
import logger from './utils/logger';

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {

    const funcName = "[STORYLAND-MAIN] "
    try {
        
        logger.info(funcName + `Started, connecting to mongoDB...`)
        await connectDB();

        logger.info(funcName + `Connected to mongoDB, Server running on port ${PORT}`)

        logger.warn("asdwarnnn213")

        const name = 'The Brave Lion';
        const text = 'Once upon a time, in a jungle far away, there lived a brave lion...';
        const category = 'Animals';

        // await addStory(name, text, category);

        // Example Story ID (you can fetch this dynamically if needed)
        const storyID = '67ae3809a92665cb1f7cadbe'

        // Example file path
        const filePath = './exampleaudioxx.ogg'; // Replace with actual file path

        // await addStoryAudio(storyID, filePath);

    } catch (error: any) {
        logger.info('Error: ' + error.message || error);
    }
}).on('error', (e: any) => logger.error(e));