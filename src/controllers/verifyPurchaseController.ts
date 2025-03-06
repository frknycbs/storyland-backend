import { Request, Response } from 'express';
import { google } from 'googleapis';
import logger from '../utils/logger';
import { GooglePlayPurchaseReceipt, GooglePlayPurchaseReceiptDB, GooglePlayPurchaseReceiptResponse, GooglePlayVerifyPurchaseRequestBody } from '../types';
import GooglePlayPurchaseReceiptModel from '../database/models/GooglePlayPurchaseReceipt';
import { verifyPurchaseService } from '../services/verifyPurchaseService';
import StoryModel from '../database/models/Story';

export const verifyPurchase = async (req: Request, res: Response) => {
    const funcName = "[VERIFY-PURCHASE-CONTROLLER] ";
    try {
        const receipt: GooglePlayVerifyPurchaseRequestBody = req.body;

        // logger.info(`${funcName} Receipt: ${JSON.stringify(receipt, null, 4)}`);

        const isVerified: true | null = await verifyPurchaseService(receipt);

        if (!isVerified)
            throw new Error('Receipt verification failed');

        // If the receipt is verified, fetch all stories from category (=productId)
        const stories = await StoryModel.find({ category: receipt.productId });
        for(const story of stories)
            story.disabled = false

        return res.json(stories);
    } catch (error: any) {
        logger.error(`${funcName} Error: ${error.message}`);
        return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};
