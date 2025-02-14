"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoryAudio = void 0;
const StoryAudio_1 = __importDefault(require("../database/models/StoryAudio"));
const getStoryAudio = async (req, res) => {
    try {
        const { storyID } = req.query;
        if (!storyID) {
            return res.status(400).json({ message: 'Story ID is required' });
        }
        const audio = await StoryAudio_1.default.findOne({ storyID });
        if (!audio)
            return res.status(404).json({ message: 'Audio not found' });
        res.set('Content-Type', 'audio/mpeg');
        return res.send(audio.file);
    }
    catch (error) {
        return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};
exports.getStoryAudio = getStoryAudio;
