"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const stories_1 = require("./assets/stories");
const connectDB_1 = require("./database/connectDB");
const Story_1 = __importDefault(require("./database/models/Story"));
const addStory_1 = __importDefault(require("./database/service/addStory"));
const logger_1 = __importDefault(require("./utils/logger"));
const PORT = process.env.PORT || null;
const mongoURI = process.env.MONGO_URI || null;
app_1.default.listen(PORT, async () => {
    const funcName = "[STORYLAND-MAIN] ";
    try {
        if (!mongoURI)
            throw ("MongoDB URI not found.");
        if (!PORT)
            throw ("Port not found.");
        logger_1.default.info(funcName + `Server running on port ${PORT}, connecting to mongoDB...`);
        let res = await (0, connectDB_1.connectDB)(mongoURI);
        if (!res)
            throw ("MongoDB connection failed.");
        logger_1.default.info(funcName + `Connected to mongoDB: ${mongoURI.split("@")[1]}`);
        await Story_1.default.collection.drop();
        for (const story of stories_1.stories) {
            await (0, addStory_1.default)(story.name, story.characterName, story.text, story.title, story.category, story.free);
        }
    }
    catch (error) {
        logger_1.default.info(funcName + 'Error: ' + error);
    }
}).on('error', (e) => logger_1.default.error(e));
