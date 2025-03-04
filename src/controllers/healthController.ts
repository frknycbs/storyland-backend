import { Request, Response } from 'express';
import { constants } from '../assets/constants';

export const health = async (req: Request, res: Response) => {
    try {
        return res.json({ status: 'OK'});
    } catch (error: unknown) {
        return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};
