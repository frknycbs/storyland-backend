"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const constants_1 = require("./constants");
const connectDB_1 = require("./database/connectDB");
const logger_1 = __importDefault(require("./utils/logger"));
const PORT = process.env.PORT || 3000;
const mongoURI = constants_1.constants.REMOTE_MONGO_URI;
app_1.default.listen(PORT, async () => {
    const funcName = "[STORYLAND-MAIN] ";
    try {
        logger_1.default.info(funcName + `Started, connecting to mongoDB...`);
        await (0, connectDB_1.connectDB)(mongoURI);
        logger_1.default.info(funcName + `Connected to mongoDB: ${mongoURI}, Server running on port ${PORT}`);
    }
    catch (error) {
        logger_1.default.info('Error: ' + error.message || error);
    }
}).on('error', (e) => logger_1.default.error(e));
