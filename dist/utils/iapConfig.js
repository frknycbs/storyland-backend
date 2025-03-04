"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.iapConfig = void 0;
const in_app_purchase_1 = __importDefault(require("in-app-purchase"));
const logger_1 = __importDefault(require("./logger"));
const iapConfig = async () => {
    const funcName = "[IAP-CONFIG] ";
    try {
        await in_app_purchase_1.default.config({
            /* Configurations for Google Service Account validation: You can validate with just packageName, productId, and purchaseToken */
            googleServiceAccount: {
                clientEmail: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL || "",
                privateKey: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || "",
            },
        });
        await in_app_purchase_1.default.setup();
        return true;
    }
    catch (err) {
        logger_1.default.error(funcName + "Error: " + err);
        return null;
    }
};
exports.iapConfig = iapConfig;
