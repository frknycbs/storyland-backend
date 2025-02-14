import Audio from '../models/StoryAudio'; // Assuming Audio.ts is in the same directory
import mongoose from 'mongoose';
import fs from 'fs';
import logger from '../../utils/logger';
import { StoryAudio } from '../../types';

const addStoryAudio = async (storyID: string, filePath: string): Promise<StoryAudio | null> => {
    try {
        // Read the file as a Buffer
        const fileBuffer = fs.readFileSync(filePath);

        // Create a new Audio document
        const newAudio = new Audio({
            file: fileBuffer,
            storyID
        });

        // Save the audio to the database
        const savedStoryAudio: StoryAudio = await newAudio.save();
        logger.info('Story Audio added:', savedStoryAudio);
        return savedStoryAudio;
    } catch (error) {
        logger.error('Error adding audio:', error);
        return null;
    }
};

export default addStoryAudio;
