"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPurchase = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const verifyPurchase = async (req, res) => {
    const funcName = "[VERIFY-PURCHASE] ";
    try {
        const receipt = req.body;
        logger_1.default.info(`${funcName} Receipt: ${JSON.stringify(receipt, null, 4)}`);
        return res.json({ receipt });
    }
    catch (error) {
        return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};
exports.verifyPurchase = verifyPurchase;
