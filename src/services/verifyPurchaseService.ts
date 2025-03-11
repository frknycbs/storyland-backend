import { Request, Response } from 'express';
import { google } from 'googleapis';
import logger from '../utils/logger';
import { GooglePlayPurchaseReceipt, GooglePlayPurchaseReceiptDB, GooglePlayPurchaseReceiptResponse, GooglePlayVerifyPurchaseRequestBody } from '../types';
import GooglePlayPurchaseReceiptModel from '../database/models/GooglePlayPurchaseReceipt';
import { ObjectId } from "mongodb";

export const verifyPurchaseService = async (receipt: GooglePlayVerifyPurchaseRequestBody): Promise<true | null> => {
    const funcName = "[VERIFY-PURCHASE-SERVICE] ";
    try {
        logger.info(`${funcName} Receipt: ${JSON.stringify(receipt, null, 4)}`);

        // First, we check DB even though it is supposed to be a new receipt so we don't really expect to find it
        const doc: GooglePlayPurchaseReceiptDB | null = await GooglePlayPurchaseReceiptModel.findById({ _id: receipt.purchaseToken});
        if (doc) {
            return true
        }

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
        const response: GooglePlayPurchaseReceiptResponse = (await androidPublisher.purchases.products.get({
            packageName: receipt.packageName,
            productId: receipt.productId,
            token: receipt.purchaseToken,
        })).data as GooglePlayPurchaseReceiptResponse;

        // Log the purchase details
        logger.info(`${funcName} Purchase Verification Response for purchase ${receipt.purchaseToken}: ${JSON.stringify(response, null, 4)}`);

        if(response.purchaseState === null || response.purchaseState === undefined)
            throw new Error('Purchase verification failed for purchase ' + receipt.purchaseToken + ': No purchase state found.');

        if(response.acknowledgementState === null || response.acknowledgementState === undefined)
            throw new Error('Purchase verification failed for purchase ' + receipt.purchaseToken + ': No acknowledgement state found.');


        if(response.purchaseState !== 0)
            throw new Error('Purchase verification failed for purchase ' + receipt.purchaseToken + ': Purchase either pending or canceled');

        // Here, we ensure purchase is completed.  if not acknowledged, acknowledge the purchase as well
        if(response.acknowledgementState === 0) {
            logger.info(`${funcName} Purchase ${receipt.purchaseToken} is yet to be acknowledged, acknowledging purchase...`)
            const res = await androidPublisher.purchases.products.acknowledge({
                packageName: receipt.packageName,
                productId: receipt.productId,
                token: receipt.purchaseToken
            })

            if(res.status.toString()[0] === "2")
                logger.info(`${funcName} Purchase ${receipt.purchaseToken} acknowledged`)
            else
                throw new Error('Purchase verification failed for purchase ' + receipt.purchaseToken + ': Could not acknowledge purchase: ' + JSON.stringify(res.status, null, 4));

        }

        // Here, we ensure the purchase is acknowledged, now adding it to DB

        await GooglePlayPurchaseReceiptModel.updateOne(
            { _id: receipt.purchaseToken }, // Search by `_id`
            {
                packageName: receipt.packageName,
                productId: receipt.productId
            },
            { upsert: true } // Insert if it doesn't exist
        );


        // Send the response back to the client
        return true
    } catch (error: any) {
        logger.error(`${funcName} Error: ${error.message}`);
        return null 
    }
};
