"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPurchase = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const verifyPurchaseService_1 = require("../services/verifyPurchaseService");
const Story_1 = __importDefault(require("../database/models/Story"));
const verifyPurchase = async (req, res) => {
    const funcName = "[VERIFY-PURCHASE-CONTROLLER] ";
    try {
        const receipt = req.body;
        // logger.info(`${funcName} Receipt: ${JSON.stringify(receipt, null, 4)}`);
        const isVerified = await (0, verifyPurchaseService_1.verifyPurchaseService)(receipt);
        if (!isVerified)
            throw new Error('Receipt verification failed');
        // If the receipt is verified, fetch all stories from category (=productId)
        let storiesDb = await Story_1.default.find({ category: receipt.productId });
        // Map over the stories to create new objects with disabled: false
        let stories = storiesDb.map(story => ({
            ...story.toObject(), // Convert Mongoose document to plain object
            disabled: false
        }));
        // console.log(JSON.stringify(finalStories, null, 4))
        return res.json(stories);
    }
    catch (error) {
        logger_1.default.error(`${funcName} Error: ${error.message}`);
        return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};
exports.verifyPurchase = verifyPurchase;
