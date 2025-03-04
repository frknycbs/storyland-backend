"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPurchase = void 0;
const in_app_purchase_1 = __importDefault(require("in-app-purchase"));
const logger_1 = __importDefault(require("../utils/logger"));
const verifyPurchase = async (req, res) => {
    const funcName = "[VERIFY-PURCHASE] ";
    try {
        const receipt = req.body.receipt;
        const service = req.body.service;
        if (!receipt || !service) {
            return res.status(400).json({ message: 'Receipt/Service name is required' });
        }
        const response = await in_app_purchase_1.default.validate({
            service, receipt
        });
        logger_1.default.info(`${funcName} Response: ${JSON.stringify(response)}`);
        return res.json({ response });
    }
    catch (error) {
        return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};
exports.verifyPurchase = verifyPurchase;
