"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
const Story_1 = __importDefault(require("../models/Story"));
const addStory = async (name, text, category) => {
    try {
        // Create a new story object
        const newStory = new Story_1.default({
            name,
            text,
            category
        });
        // Save the story to the database
        const savedStory = await newStory.save();
        logger_1.default.info('Story added:', savedStory);
        return savedStory;
    }
    catch (error) {
        logger_1.default.error('Error adding story:', error);
        throw error;
    }
};
exports.default = addStory;
