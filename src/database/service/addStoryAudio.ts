import Audio from '../models/Audio'; // Assuming Audio.ts is in the same directory
import mongoose from 'mongoose';
import fs from 'fs';

const addStoryAudio = async (storyID: string, filePath: string) => {
  try {
    // Read the file as a Buffer
    const fileBuffer = fs.readFileSync(filePath);

    // Create a new Audio document
    const newAudio = new Audio({
      file: fileBuffer,
      storyID
    });

    // Save the audio to the database
    const savedAudio = await newAudio.save();
    console.log('Audio added:', savedAudio);
    return savedAudio;
  } catch (error) {
    console.error('Error adding audio:', error);
    throw error;
  }
};

export default addStoryAudio;
