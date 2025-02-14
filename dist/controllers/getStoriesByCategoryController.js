"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStoriesByCategory = void 0;
const Story_1 = __importDefault(require("../database/models/Story"));
const getStoriesByCategory = async (req, res) => {
    try {
        const { category } = req.query;
        if (!category) {
            return res.status(400).json({ message: 'Category is required' });
        }
        const stories = await Story_1.default.find({ category });
        if (stories.length === 0) {
            return res.status(404).json({ message: 'No stories found for this category' });
        }
        return res.json(stories);
    }
    catch (error) {
        return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};
exports.getStoriesByCategory = getStoriesByCategory;
