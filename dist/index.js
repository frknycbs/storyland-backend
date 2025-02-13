"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 3000;
app_1.default.listen(PORT, async () => {
    const funcName = "[BLOCK-SCANNER-MAIN] ";
    try {
        console.log(`Server running on port ${PORT}`);
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
        console.log('Error: ' + error.message || error);
    }
}).on('error', (e) => console.error(e));
