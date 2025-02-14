"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StoryAudio_1 = __importDefault(require("../models/StoryAudio")); // Assuming Audio.ts is in the same directory
const fs_1 = __importDefault(require("fs"));
const logger_1 = __importDefault(require("../../utils/logger"));
const addStoryAudio = async (storyID, filePath) => {
    try {
        // Read the file as a Buffer
        const fileBuffer = fs_1.default.readFileSync(filePath);
        // Create a new Audio document
        const newAudio = new StoryAudio_1.default({
            file: fileBuffer,
            storyID
        });
        // Save the audio to the database
        const savedStoryAudio = await newAudio.save();
        logger_1.default.info('Story Audio added:', savedStoryAudio);
        return savedStoryAudio;
    }
    catch (error) {
        logger_1.default.error('Error adding audio:', error);
        return null;
    }
};
exports.default = addStoryAudio;
