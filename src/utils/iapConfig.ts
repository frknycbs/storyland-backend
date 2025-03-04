import iap from 'in-app-purchase';
import logger from './logger';

export const iapConfig = async (): Promise<true | null> => {
    const funcName = "[IAP-CONFIG] "
    try {
        await iap.config({
            /* Configurations for Google Service Account validation: You can validate with just packageName, productId, and purchaseToken */
            googleServiceAccount: {
                clientEmail: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL || "",
                privateKey: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || "",
            },
        });

        await iap.setup();
        return true
    }

    catch(err) {
        logger.error(funcName + "Error: " + err)
        return null
    }
}
