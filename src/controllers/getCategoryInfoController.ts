import { Request, Response } from 'express';
import Story from '../database/models/Story';
import { constants } from '../constants';

export const getCategoryInfo = async (req: Request, res: Response) => {
    try {
        
        const categoryInfo: Array<{categoryName: string, bgImageURL: string}> = []

        for(const elem of constants.categories) {
            categoryInfo.push({categoryName: elem, bgImageURL: `${process.env.BASE_URL}/category_backgrounds/${elem.toLowerCase()}.jpg`})
        }

        return res.json(categoryInfo);
    } catch (error: unknown) {
        return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};
