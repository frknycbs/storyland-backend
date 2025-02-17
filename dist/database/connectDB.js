"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../utils/logger"));
const connectDB = async (mongoURI) => {
    try {
        await mongoose_1.default.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        return true; // Explicitly returning 'true' when successful
    }
    catch (err) {
        logger_1.default.error(err);
        return null; // Explicitly returning 'null' when error occurs
    }
};
exports.connectDB = connectDB;
