import { Request, Response } from 'express';
import StoryModel from '../database/models/Story';

export const getStoriesByCategory = async (req: Request, res: Response) => {
    try {
        const { category } = req.query;

        if (!category) {
            return res.status(400).json({ message: 'Category is required' });
        }

        const stories = await StoryModel.find({ category });

        if (stories.length === 0) {
            return res.status(404).json({ message: 'No stories found for this category' });
        }

        return res.json(stories);
    } catch (error: unknown) {
        return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};