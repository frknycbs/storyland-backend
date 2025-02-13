import Story from '../models/Story'; // Assuming Story.ts is in the same directory
import mongoose from 'mongoose';

const addStory = async (name: string, text: string, category: string) => {
  try {
    // Create a new story object
    const newStory = new Story({
      name, 
      text,
      category
    });

    // Save the story to the database
    const savedStory = await newStory.save();
    console.log('Story added:', savedStory);
    return savedStory;
  } catch (error) {
    console.error('Error adding story:', error);
    throw error;
  }
};

export default addStory