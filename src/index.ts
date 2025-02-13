
import mongoose from 'mongoose';
import app from './app';
import addStory from './database/service/addStory';
import addStoryAudio from './database/service/addStoryAudio';

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
	const funcName = "[BLOCK-SCANNER-MAIN] "
	try {
        console.log(`Server running on port ${PORT}`)

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
		console.log('Error: ' + error.message || error);
	}
}).on('error', (e: any) => console.error(e));