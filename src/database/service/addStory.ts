import { Story } from '../../types';
import logger from '../../utils/logger';
import StoryModel from '../models/Story';
import { ObjectId } from "mongodb";

const addStory = async (name: string, text: string, title: string, category: string) : Promise<Story | null> => {
    try {
        // Create a new story object
        const _id = new ObjectId().toString();

        const newStory = new StoryModel({
            _id,
            name,
            text,
            title,
            category,
            thumbnailURL: `${process.env.BASE_URL}/thumbnails/${name.toLowerCase()}_thumbnail.jpg`,
            imageURL: `${process.env.BASE_URL}/backgrounds/${name.toLowerCase()}_bg.jpg`,
            audioURL: `${process.env.BASE_URL}/audios/${name.toLowerCase()}_audio.mp3`
        });

        // Save the story to the database
        const savedStory: Story = await newStory.save();
        logger.info('Story added:' + JSON.stringify(savedStory));
        return savedStory;
    } catch (error) {
        logger.error('Error adding story: ' + error);
        return null
    }
};

export default addStory