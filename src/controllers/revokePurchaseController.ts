import { Request, Response } from 'express';
import { google } from 'googleapis';
import logger from '../utils/logger';
import { GooglePlayPurchaseReceipt, GooglePlayPurchaseReceiptDB, GooglePlayPurchaseReceiptResponse, GooglePlayVerifyPurchaseRequestBody, Story } from '../types';
import GooglePlayPurchaseReceiptModel from '../database/models/GooglePlayPurchaseReceipt';
import { verifyPurchaseService } from '../services/verifyPurchaseService';
import StoryModel from '../database/models/Story';
import { revokePurchaseService } from '../services/revokePurchaseService';


export const revokePurchase = async (req: Request, res: Response) => {
    const funcName = "[VERIFY-PURCHASE-CONTROLLER] ";
    try {
        const {packageName, orderId} = req.body;

        // logger.info(`${funcName} Receipt: ${JSON.stringify(receipt, null, 4)}`);

        const isRevoked: true | null = await revokePurchaseService(packageName, orderId);

        // console.log(JSON.stringify(finalStories, null, 4))
        return res.json(isRevoked);
    } catch (error: any) {
        logger.error(`${funcName} Error: ${error.message}`);
        return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};
