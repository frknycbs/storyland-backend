"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Audio_1 = __importDefault(require("../models/Audio")); // Assuming Audio.ts is in the same directory
const fs_1 = __importDefault(require("fs"));
const addStoryAudio = async (storyID, filePath) => {
    try {
        // Read the file as a Buffer
        const fileBuffer = fs_1.default.readFileSync(filePath);
        // Create a new Audio document
        const newAudio = new Audio_1.default({
            file: fileBuffer,
            storyID
        });
        // Save the audio to the database
        const savedAudio = await newAudio.save();
        console.log('Audio added:', savedAudio);
        return savedAudio;
    }
    catch (error) {
        console.error('Error adding audio:', error);
        throw error;
    }
};
exports.default = addStoryAudio;
