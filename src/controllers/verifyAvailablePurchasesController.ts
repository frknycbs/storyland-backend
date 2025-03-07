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

        if (receipts.length > 4) {
            return res.status(400).json({ message: 'Too many receipts' });
        }

        logger.info(`${funcName} Receipts: ${JSON.stringify(receipts, null, 4)}`);

        // Remove duplicate purchaseTokens
        const uniqueByPurchaseToken = Array.from(
            new Map(receipts.map(item => [item.purchaseToken, item])).values()
        );

        logger.info(`${funcName} uniqueByPurchaseToken: ${JSON.stringify(uniqueByPurchaseToken, null, 4)}`);
        // Remove duplicate productIds from the filtered array
        const distinctReceipts: Array<GooglePlayVerifyPurchaseRequestBody> = Array.from(
            new Map(uniqueByPurchaseToken.map(item => [item.productId, item])).values()
        );

        logger.info(`${funcName} distinctReceipts: ${JSON.stringify(distinctReceipts, null, 4)}`);
        // Init final receipts by first, asking our DB for verified receipts
        const receiptsDb: Array<GooglePlayPurchaseReceiptDB> =
            await GooglePlayPurchaseReceiptModel.find({ _id: { $in: distinctReceipts.map(receipt => receipt.purchaseToken) } });

        logger.info(`${funcName} Receipts in DB: ${JSON.stringify(receiptsDb, null, 4)}`);

        // Find receipts that are missing from distinctReceipts
        const missingReceipts: Array<GooglePlayVerifyPurchaseRequestBody> =
            distinctReceipts.filter(receipt => !receiptsDb.find(receiptDb => receiptDb._id === receipt.purchaseToken));

        logger.info(`${funcName} Missing Receipts: ${JSON.stringify(missingReceipts, null, 4)}`);

        const finalReceipts: Array<GooglePlayVerifyPurchaseRequestBody> = receiptsDb.map(receiptDb => ({
            packageName: receiptDb.packageName,
            productId: receiptDb.productId,
            purchaseToken: receiptDb._id
        }));

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
        
        const storiesDb = await StoryModel.find()

        const stories: Story[] = storiesDb.map(story => ({
            ...story.toObject(), // Convert Mongoose document to plain object
        }));

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
