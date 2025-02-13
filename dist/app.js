"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const Story_1 = __importDefault(require("./database/models/Story"));
const Audio_1 = __importDefault(require("./database/models/Audio"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
mongoose_1.default.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err instanceof Error ? err.message : 'Unknown error'));
// Fetch story text
app.get('/getStoryText', async (req, res) => {
    try {
        const { storyID } = req.query;
        if (!storyID) {
            return res.status(400).json({ message: 'Story ID is required' });
        }
        const story = await Story_1.default.findById(storyID);
        if (!story)
            return res.status(404).json({ message: 'Story not found' });
        res.json(story);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
// Fetch story audio
app.get('/getStoryAudio', async (req, res) => {
    try {
        const { storyID } = req.query;
        if (!storyID) {
            return res.status(400).json({ message: 'Story ID is required' });
        }
        const audio = await Audio_1.default.findOne({ storyID });
        if (!audio)
            return res.status(404).json({ message: 'Audio not found' });
        res.set('Content-Type', 'audio/mpeg');
        res.send(audio.file);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
app.get('/getStoriesByCategory', async (req, res) => {
    try {
        const { category } = req.query;
        if (!category) {
            return res.status(400).json({ message: 'Category is required' });
        }
        // Find all stories with the given category
        const stories = await Story_1.default.find({ category });
        if (stories.length === 0) {
            return res.status(404).json({ message: 'No stories found for this category' });
        }
        res.json(stories);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
exports.default = app;
