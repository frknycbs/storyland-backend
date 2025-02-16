"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStory = void 0;
const Story_1 = __importDefault(require("../database/models/Story"));
const getStory = async (req, res) => {
    try {
        const { storyID } = req.query;
        if (!storyID) {
            return res.status(400).json({ message: 'Story ID is required' });
        }
        const story = await Story_1.default.findById(storyID);
        if (!story)
            return res.status(404).json({ message: 'Story not found' });
        return res.json(story);
    }
    catch (error) {
        return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};
exports.getStory = getStory;
