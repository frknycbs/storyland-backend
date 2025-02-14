import { Story } from '../../types';
import logger from '../../utils/logger';
import StoryModel from '../models/Story';

const addStory = async (name: string, text: string, category: string) : Promise<Story | null> => {
    try {
        // Create a new story object
        const newStory = new StoryModel({
            name,
            text,
            category
        });

        // Save the story to the database
        const savedStory: Story = await newStory.save();
        logger.info('Story added:', savedStory);
        return savedStory;
    } catch (error) {
        logger.error('Error adding story:', error);
        throw error;
    }
};

export default addStory