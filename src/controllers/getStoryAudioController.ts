import { Request, Response } from 'express';
import Audio from '../database/models/StoryAudio';

export const getStoryAudio = async (req: Request, res: Response) => {
    try {
        const { storyID } = req.query;

        if (!storyID) {
            return res.status(400).json({ message: 'Story ID is required' });
        }

        const audio = await Audio.findOne({ storyID });
        if (!audio) return res.status(404).json({ message: 'Audio not found' });

        res.set('Content-Type', 'audio/mpeg');
        return res.send(audio.file);
    } catch (error: unknown) {
        return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};
