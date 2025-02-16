"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addStoryController = void 0;
const addStory_1 = __importDefault(require("../database/service/addStory"));
const addStoryController = async (req, res) => {
    try {
        const { body } = req;
        if (!body?.name || !body?.text || !body?.title || !body?.category) {
            return res.status(400).json({ message: 'Missing info' });
        }
        const addedStory = await (0, addStory_1.default)(body.name, body.text, body.title, body.category);
        if (!addedStory) {
            return res.status(500).json({ message: 'Error adding story' });
        }
        return res.json(addedStory);
    }
    catch (error) {
        return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};
exports.addStoryController = addStoryController;
