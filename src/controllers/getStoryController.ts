import { Request, Response } from 'express';
import Story from '../database/models/Story';

export const getStory = async (req: Request, res: Response) => {
    try {
        const { storyID } = req.query;

        if (!storyID) {
            return res.status(400).json({ message: 'Story ID is required' });
        }

        const story = await Story.findById(storyID);
        if (!story) return res.status(404).json({ message: 'Story not found' });

        return res.json(story);
    } catch (error: unknown) {
        return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};
