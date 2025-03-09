"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.revokePurchaseService = void 0;
const googleapis_1 = require("googleapis");
const logger_1 = __importDefault(require("../utils/logger"));
const revokePurchaseService = async (packageName, orderId) => {
    const funcName = "[REVOKE-PURCHASE-SERVICE] ";
    try {
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
        const response = await androidPublisher.orders.refund({
            packageName,
            orderId,
            revoke: true
        });
        // Log the purchase details
        logger_1.default.info(`${funcName} Purchase Revocation Response: `, response.status);
        return true;
    }
    catch (error) {
        logger_1.default.error(`${funcName} Error: ${error.message}`);
        return null;
    }
};
exports.revokePurchaseService = revokePurchaseService;
