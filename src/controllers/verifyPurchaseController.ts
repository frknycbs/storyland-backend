import { Request, Response } from 'express';
import { google } from 'googleapis';
import logger from '../utils/logger';
import { GooglePlayPurchaseReceipt, GooglePlayPurchaseReceiptDB, GooglePlayPurchaseReceiptResponse, GooglePlayVerifyPurchaseRequestBody, Story } from '../types';
import GooglePlayPurchaseReceiptModel from '../database/models/GooglePlayPurchaseReceipt';
import { verifyPurchaseService } from '../services/verifyPurchaseService';
import StoryModel from '../database/models/Story';
import { constants } from '../assets/constants';

export const verifyPurchase = async (req: Request, res: Response) => {
    const funcName = "[VERIFY-PURCHASE-CONTROLLER] ";
    try {
        const receipt: GooglePlayVerifyPurchaseRequestBody = req.body;
        let isVerified: true | null = null

        if (receipt) {
            if (Object.keys(receipt).length !== 4)
                throw new Error('Missing required field count');

            if (!receipt.packageName || !receipt.productId || !receipt.purchaseToken || !receipt.orderId)
                throw new Error('Missing required fields');

            isVerified = await verifyPurchaseService(receipt)
        }

        // If the receipt is verified, fetch all stories
        let storiesDb = await StoryModel.find()
        // Map over the stories to create new objects with disabled: false

        let stories: Story[] = storiesDb.map(story => ({
            ...story.toObject(), // Convert Mongoose document to plain object
            disabled: false
        }));

        for (const story of stories) {
            story.disabled = !story.free && !isVerified

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
