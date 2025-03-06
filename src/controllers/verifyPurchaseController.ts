import { Request, Response } from 'express';
import { google } from 'googleapis';
import logger from '../utils/logger';
import { GooglePlayPurchaseReceipt, GooglePlayPurchaseReceiptDB, GooglePlayPurchaseReceiptResponse, GooglePlayVerifyPurchaseRequestBody, Story } from '../types';
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
        let storiesDb = await StoryModel.find({ category: receipt.productId })
        // Map over the stories to create new objects with disabled: false

        let stories: Story[] = storiesDb.map(story => ({
            ...story.toObject(), // Convert Mongoose document to plain object
            disabled: false
        }));

        // console.log(JSON.stringify(finalStories, null, 4))
        return res.json(stories);
    } catch (error: any) {
        logger.error(`${funcName} Error: ${error.message}`);
        return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};
