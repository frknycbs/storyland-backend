import { Request, Response } from 'express';
import iap from 'in-app-purchase';
import logger from '../utils/logger';

export const verifyPurchase = async (req: Request, res: Response) => {
    const funcName = "[VERIFY-PURCHASE] "
    try {
        const receipt: iap.GoogleReceipt | iap.AppleReceipt = req.body.receipt;
        const service: "google" | "apple" = req.body.service;

        if (!receipt || !service) {
            return res.status(400).json({ message: 'Receipt/Service name is required' });
        }

        const response: iap.ValidationResponse = await iap.validate({
            service, receipt
        });

        logger.info(`${funcName} Response: ${JSON.stringify(response)}`)

        return res.json({response});
    }
     catch (error: any) {
        return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};
