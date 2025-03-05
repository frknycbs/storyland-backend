import { Request, Response } from 'express';
import { constants } from '../assets/constants';
import StoryModel from '../database/models/Story';

export const health = async (req: Request, res: Response) => {
    try {
        const count: number | null = await StoryModel.countDocuments({});
        if(count === null)
            throw("Error in DB");
        return res.json({ status: 'OK', count});
    } catch (error: unknown) {
        return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};
