"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPurchase = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const verifyPurchaseService_1 = require("../services/verifyPurchaseService");
const Story_1 = __importDefault(require("../database/models/Story"));
const constants_1 = require("../assets/constants");
const verifyPurchase = async (req, res) => {
    const funcName = "[VERIFY-PURCHASE-CONTROLLER] ";
    try {
        const receipt = req.body;
        let isVerified = null;
        if (receipt) {
            if (Object.keys(receipt).length !== 4)
                throw new Error('Missing required field count');
            if (!receipt.packageName || !receipt.productId || !receipt.purchaseToken || !receipt.orderId)
                throw new Error('Missing required fields');
            isVerified = await (0, verifyPurchaseService_1.verifyPurchaseService)(receipt);
        }
        // If the receipt is verified, fetch all stories
        let storiesDb = await Story_1.default.find();
        // Map over the stories to create new objects with disabled: false
        let stories = storiesDb.map(story => ({
            ...story.toObject(), // Convert Mongoose document to plain object
            disabled: false
        }));
        for (const story of stories) {
            story.disabled = !story.free && !isVerified;
            if (story.disabled) {
                story.text = "";
                story.title = "";
                story.thumbnailURL = "";
                story.audioURL = "";
                story.imageURL = "";
            }
        }
        const categoryInfo = [];
        for (const elem of constants_1.constants.categories) {
            categoryInfo.push({ categoryName: elem, bgImageURL: `${process.env.RESOURCE_URL}/category_backgrounds/${elem.toLowerCase()}.jpg` });
        }
        return res.json({ stories, categoryInfo });
    }
    catch (error) {
        logger_1.default.error(`${funcName} Error: ${error.message}`);
        return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};
exports.verifyPurchase = verifyPurchase;
