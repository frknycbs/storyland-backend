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
        if (!receipts) {
            return res.status(400).json({ message: 'Missing receipts field' });
        }

        if (receipts.length > 10) {
            return res.status(400).json({ message: 'Too many receipts' });
        }

        logger.info(`${funcName} Receipts: ${JSON.stringify(receipts, null, 4)}`);

        // Remove duplicate purchaseTokens
        const uniqueByPurchaseToken = Array.from(
            new Map(receipts.map(item => [item.purchaseToken, item])).values()
        );

        // Remove duplicate productIds from the filtered array
        const distinctReceipts = Array.from(
            new Map(uniqueByPurchaseToken.map(item => [item.productId, item])).values()
        );

        // Init final receipts by first, asking our DB for verified receipts
        const finalReceipts: Array<GooglePlayVerifyPurchaseRequestBody> =
            await GooglePlayPurchaseReceiptModel.find({ purchaseToken: { $in: distinctReceipts.map(receipt => receipt.purchaseToken) } });

        logger.info(`${funcName} Final Receipts: ${JSON.stringify(finalReceipts, null, 4)}`);

        // Find receipts that are missing from distinctReceipts
        const missingReceipts: Array<GooglePlayVerifyPurchaseRequestBody> =
            distinctReceipts.filter(receipt => !finalReceipts.find(finalReceipt => finalReceipt.purchaseToken === receipt.purchaseToken));

        logger.info(`${funcName} Missing Receipts: ${JSON.stringify(missingReceipts, null, 4)}`);

        // If there are missing receipts in DB, verify them via Google
        if (missingReceipts.length > 0) {
            for (const receipt of missingReceipts) {
                const isVerified: true | null = await verifyPurchaseService(receipt);

                if (isVerified)
                    finalReceipts.push(receipt);
            }
        }

        logger.info(`${funcName} Final Receipts after missing receipts (if any) added: ${JSON.stringify(finalReceipts, null, 4)}`);

        // Now, we'll find distinct product Ids
        const distinctProductIds = finalReceipts.map(receipt => receipt.productId);


        // If the receipt is verified, fetch all stories from category (=productId)
        const stories: Story[] = await StoryModel.find();
        for (const story of stories) {
            const isDisabled = !story.free && !distinctProductIds.includes(story.category);
            story.disabled = isDisabled;

            if (isDisabled) {
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
