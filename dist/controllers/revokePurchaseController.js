"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.revokePurchase = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const revokePurchaseService_1 = require("../services/revokePurchaseService");
const revokePurchase = async (req, res) => {
    const funcName = "[VERIFY-PURCHASE-CONTROLLER] ";
    try {
        const { packageName, orderId } = req.body;
        // logger.info(`${funcName} Receipt: ${JSON.stringify(receipt, null, 4)}`);
        const isRevoked = await (0, revokePurchaseService_1.revokePurchaseService)(packageName, orderId);
        // console.log(JSON.stringify(finalStories, null, 4))
        return res.json(isRevoked);
    }
    catch (error) {
        logger_1.default.error(`${funcName} Error: ${error.message}`);
        return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};
exports.revokePurchase = revokePurchase;
