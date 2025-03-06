"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAvailablePurchases = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const GooglePlayPurchaseReceipt_1 = __importDefault(require("../database/models/GooglePlayPurchaseReceipt"));
const verifyPurchaseService_1 = require("../services/verifyPurchaseService");
const Story_1 = __importDefault(require("../database/models/Story"));
const constants_1 = require("../assets/constants");
const verifyAvailablePurchases = async (req, res) => {
    const funcName = "[VERIFY-AVAILABLE-PURCHASES-CONTROLLER] ";
    try {
        const receipts = req.body;
        if (!receipts) {
            return res.status(400).json({ message: 'Missing receipts field' });
        }
        if (receipts.length > 10) {
            return res.status(400).json({ message: 'Too many receipts' });
        }
        logger_1.default.info(`${funcName} Receipts: ${JSON.stringify(receipts, null, 4)}`);
        // Remove duplicate purchaseTokens
        const uniqueByPurchaseToken = Array.from(new Map(receipts.map(item => [item.purchaseToken, item])).values());
        // Remove duplicate productIds from the filtered array
        const distinctReceipts = Array.from(new Map(uniqueByPurchaseToken.map(item => [item.productId, item])).values());
        // Init final receipts by first, asking our DB for verified receipts
        const receiptsDb = await GooglePlayPurchaseReceipt_1.default.find({ _id: { $in: distinctReceipts.map(receipt => receipt.purchaseToken) } });
        logger_1.default.info(`${funcName} Receipts in DB: ${JSON.stringify(receiptsDb, null, 4)}`);
        // Find receipts that are missing from distinctReceipts
        const missingReceipts = distinctReceipts.filter(receipt => !receiptsDb.find(receiptDb => receiptDb._id === receipt.purchaseToken));
        logger_1.default.info(`${funcName} Missing Receipts: ${JSON.stringify(missingReceipts, null, 4)}`);
        const finalReceipts = receiptsDb.map(receiptDb => ({
            packageName: receiptDb.packageName,
            productId: receiptDb.productId,
            purchaseToken: receiptDb._id
        }));
        // If there are missing receipts in DB, verify them via Google
        if (missingReceipts.length > 0) {
            for (const receipt of missingReceipts) {
                const isVerified = await (0, verifyPurchaseService_1.verifyPurchaseService)(receipt);
                if (isVerified)
                    finalReceipts.push(receipt);
            }
        }
        logger_1.default.info(`${funcName} Final Receipts after missing receipts (if any) added: ${JSON.stringify(finalReceipts, null, 4)}`);
        // Now, we'll find distinct product Ids
        const distinctProductIds = finalReceipts.map(receipt => receipt.productId);
        // If the receipt is verified, fetch all stories from category (=productId)
        const stories = await Story_1.default.find();
        for (const story of stories) {
            const isDisabled = !story.free && !distinctProductIds.includes(story.category);
            story.disabled = isDisabled;
            if (isDisabled) {
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
exports.verifyAvailablePurchases = verifyAvailablePurchases;
