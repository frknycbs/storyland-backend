import { Request, Response } from 'express';
import iap from 'in-app-purchase';
import logger from '../utils/logger';

export const verifyPurchase = async (req: Request, res: Response) => {
    const funcName = "[VERIFY-PURCHASE] "
    try {
        
        const receipt = req.body;
        logger.info(`${funcName} Receipt: ${JSON.stringify(receipt, null, 4)}`);

        return res.json({receipt});
    }
     catch (error: any) {
        return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};
