import { Request, Response } from 'express';
import { google } from 'googleapis';
import logger from '../utils/logger';
import { GooglePlayPurchaseReceipt, GooglePlayPurchaseReceiptDB, GooglePlayPurchaseReceiptResponse, GooglePlayVerifyPurchaseRequestBody } from '../types';
import GooglePlayPurchaseReceiptModel from '../database/models/GooglePlayPurchaseReceipt';
import { ObjectId } from "mongodb";

export const revokePurchaseService = async (packageName: string, orderId: string): Promise<true | null> => {
    const funcName = "[REVOKE-PURCHASE-SERVICE] ";
    try {
        // Initialize the Google Play Developer API client
        const androidPublisher = google.androidpublisher({
            version: 'v3',
            auth: new google.auth.GoogleAuth({
                credentials: {
                    type: process.env.GOOGLE_SERVICE_ACCOUNT_TYPE,
                    project_id: process.env.GOOGLE_SERVICE_ACCOUNT_PROJECT_ID,
                    private_key_id: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY_ID,
                    private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n') || "",
                    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL,
                    client_id: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_ID,
                },
                scopes: ['https://www.googleapis.com/auth/androidpublisher'],
            }),
        });

        // Call the Google Play Developer API to verify the purchase
        const response = await androidPublisher.orders.refund({
            packageName,
            orderId,
            revoke: true
        })

        // Log the purchase details
        logger.info(`${funcName} Purchase Revocation Response: ${response.status}`, );

       
        return true
    } catch (error: any) {
        logger.error(`${funcName} Error: ${error.message}`);
        return null 
    }
};
