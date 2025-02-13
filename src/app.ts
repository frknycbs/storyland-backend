import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Story from './database/models/Story';
import Audio from './database/models/Audio';
import addStory from './database/service/addStory';

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions)
  .then(() => console.log('MongoDB connected'))
  .catch((err: unknown) => console.error(err instanceof Error ? err.message : 'Unknown error'));

// Fetch story text
app.get('/getStoryText', async (req, res) => {
  try {
    const { storyID } = req.query;

    if (!storyID) {
      return res.status(400).json({ message: 'Story ID is required' });
    }
    const story = await Story.findById(storyID);
    if (!story) return res.status(404).json({ message: 'Story not found' });
    res.json(story);
  } catch (error: unknown) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// Fetch story audio
app.get('/getStoryAudio', async (req, res) => {
  try {
    const { storyID } = req.query;

    if (!storyID) {
      return res.status(400).json({ message: 'Story ID is required' });
    }
    
    const audio = await Audio.findOne({ storyID });
    if (!audio) return res.status(404).json({ message: 'Audio not found' });
    res.set('Content-Type', 'audio/mpeg');
    res.send(audio.file);
  } catch (error: unknown) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

app.get('/getStoriesByCategory', async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }

    // Find all stories with the given category
    const stories = await Story.find({ category });

    if (stories.length === 0) {
      return res.status(404).json({ message: 'No stories found for this category' });
    }

    res.json(stories);
  } catch (error: unknown) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});


export default app