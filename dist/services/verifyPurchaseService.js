"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPurchaseService = void 0;
const googleapis_1 = require("googleapis");
const logger_1 = __importDefault(require("../utils/logger"));
const GooglePlayPurchaseReceipt_1 = __importDefault(require("../database/models/GooglePlayPurchaseReceipt"));
const verifyPurchaseService = async (receipt) => {
    const funcName = "[VERIFY-PURCHASE-SERVICE] ";
    try {
        logger_1.default.info(`${funcName} Receipt: ${JSON.stringify(receipt, null, 4)}`);
        // First, we check DB even though it is supposed to be a new receipt so we don't really expect to find it
        const doc = await GooglePlayPurchaseReceipt_1.default.findById({ _id: receipt.purchaseToken });
        if (doc) {
            return true;
        }
        // Initialize the Google Play Developer API client
        const androidPublisher = googleapis_1.google.androidpublisher({
            version: 'v3',
            auth: new googleapis_1.google.auth.GoogleAuth({
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
        const response = (await androidPublisher.purchases.products.get({
            packageName: receipt.packageName,
            productId: receipt.productId,
            token: receipt.purchaseToken,
        })).data;
        // Log the purchase details
        logger_1.default.info(`${funcName} Purchase Verification Response for purchase ${receipt.purchaseToken}: ${JSON.stringify(response, null, 4)}`);
        if (response.purchaseState === null || response.purchaseState === undefined)
            throw new Error('Purchase verification failed for purchase ' + receipt.purchaseToken + ': No purchase state found.');
        if (response.acknowledgementState === null || response.acknowledgementState === undefined)
            throw new Error('Purchase verification failed for purchase ' + receipt.purchaseToken + ': No acknowledgement state found.');
        if (response.purchaseState !== 0)
            throw new Error('Purchase verification failed for purchase ' + receipt.purchaseToken + ': Purchase either pending or canceled');
        // Here, we ensure purchase is completed.  if not acknowledged, acknowledge the purchase as well
        if (response.acknowledgementState !== 0) {
            logger_1.default.info(`${funcName} Purchase ${receipt.purchaseToken} not acknowledged, acknowledging purchase...`);
            const res = await androidPublisher.purchases.products.acknowledge({
                packageName: receipt.packageName,
                productId: receipt.productId,
                token: receipt.purchaseToken
            });
            if (res.status.toString()[0] === "2")
                logger_1.default.info(`${funcName} Purchase ${receipt.purchaseToken} acknowledged`);
            else
                throw new Error('Purchase verification failed for purchase ' + receipt.purchaseToken + ': Could not acknowledge purchase: ' + JSON.stringify(res.status, null, 4));
        }
        // Here, we ensure the purchase is acknowledged, now adding it to DB
        const googlePlayReceiptDb = new GooglePlayPurchaseReceipt_1.default({
            _id: receipt.purchaseToken,
            packageName: receipt.packageName,
            productId: receipt.productId
        });
        await googlePlayReceiptDb.save();
        // Send the response back to the client
        return true;
    }
    catch (error) {
        logger_1.default.error(`${funcName} Error: ${error.message}`);
        return null;
    }
};
exports.verifyPurchaseService = verifyPurchaseService;
