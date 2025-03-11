import { Request, Response } from 'express';
import { google } from 'googleapis';
import logger from '../utils/logger';
import { Category, GooglePlayPurchaseReceipt, GooglePlayPurchaseReceiptDB, GooglePlayPurchaseReceiptResponse, GooglePlayVerifyPurchaseRequestBody, Story } from '../types';
import GooglePlayPurchaseReceiptModel from '../database/models/GooglePlayPurchaseReceipt';
import { verifyPurchaseService } from '../services/verifyPurchaseService';
import StoryModel from '../database/models/Story';
import { constants } from '../assets/constants';

export const verifyAvailablePurchases = async (req: Request, res: Response) => {
    const funcName = "[VERIFY-AVAILABLE-PURCHASES-CONTROLLER] ";
    try {
        const receipts: Array<GooglePlayVerifyPurchaseRequestBody> = req.body;
        if(receipts.length !== 1)
            throw new Error('Only one available purchase allowed');

        const receipt = receipts[0]
        if(Object.keys(receipt).length !== 3)
            throw new Error('Missing required field count');

        if(!receipt.packageName || !receipt.productId || !receipt.purchaseToken)
            throw new Error('Missing required fields');

        logger.info(`${funcName} Receipt: ${JSON.stringify(receipt, null, 4)}`);


        const isVerified: true | null = await verifyPurchaseService(receipt);
        

        // If the receipt is verified, fetch all stories from category (=productId)
        const storiesDb = await StoryModel.find();

        const stories: Story[] = storiesDb.map(story => ({
            ...story.toObject(), // Convert Mongoose document to plain object
        }));

        for (const story of stories) {
            story.disabled  = !story.free && !isVerified

            if (story.disabled) {
                story.text = ""
                story.title = ""
                story.thumbnailURL = ""
                story.audioURL = ""
                story.imageURL = ""
            }
        }

        const categoryInfo: Array<{ categoryName: string, bgImageURL: string }> = []

        for (const elem of constants.categories) {
            categoryInfo.push({ categoryName: elem, bgImageURL: `${process.env.RESOURCE_URL}/category_backgrounds/${elem.toLowerCase()}.jpg` })
        }


        return res.json({ stories, categoryInfo });
    } catch (error: any) {
        logger.error(`${funcName} Error: ${error.message}`);
        return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};
