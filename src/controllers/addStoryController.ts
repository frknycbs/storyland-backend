import { Request, Response } from 'express';
import logger from "../utils/logger";
import { Story } from '../types';
import addStory from '../database/service/addStory';

export const addStoryController = async (req: Request, res: Response) => {
    try {

        const { body } = req;

        if (!body?.name || !body?.text || !body?.title || !body?.category) {
            return res.status(400).json({ message: 'Missing info' });
        }
       
        const addedStory: Story | null = await addStory(body.name as string, body.text as string, body.title as string, body.category as string);

        if (!addedStory) {
            return res.status(500).json({ message: 'Error adding story' });
        }

        return res.json(addedStory);
    } catch (error: unknown) {
        return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};