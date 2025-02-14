"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const connectDB_1 = require("./database/connectDB");
const logger_1 = __importDefault(require("./utils/logger"));
const PORT = process.env.PORT || 3000;
app_1.default.listen(PORT, async () => {
    const funcName = "[STORYLAND-MAIN] ";
    try {
        logger_1.default.info(funcName + `Started, connecting to mongoDB...`);
        await (0, connectDB_1.connectDB)();
        logger_1.default.info(funcName + `Connected to mongoDB, Server running on port ${PORT}`);
        logger_1.default.warn("asdwarnnn213");
        const name = 'The Brave Lion';
        const text = 'Once upon a time, in a jungle far away, there lived a brave lion...';
        const category = 'Animals';
        // await addStory(name, text, category);
        // Example Story ID (you can fetch this dynamically if needed)
        const storyID = '67ae3809a92665cb1f7cadbe';
        // Example file path
        const filePath = './exampleaudioxx.ogg'; // Replace with actual file path
        // await addStoryAudio(storyID, filePath);
    }
    catch (error) {
        logger_1.default.info('Error: ' + error.message || error);
    }
}).on('error', (e) => logger_1.default.error(e));
