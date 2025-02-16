"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
const Story_1 = __importDefault(require("../models/Story"));
const mongodb_1 = require("mongodb");
const addStory = async (name, text, title, category) => {
    try {
        // Create a new story object
        const _id = new mongodb_1.ObjectId().toString();
        const newStory = new Story_1.default({
            _id,
            name,
            text,
            title,
            category,
            thumbnailURL: `${process.env.BASE_URL}/thumbnails/${name.toLowerCase()}_thumbnail.jpg`,
            imageURL: `${process.env.BASE_URL}/backgrounds/${name.toLowerCase()}_bg.jpg`,
            audioURL: `${process.env.BASE_URL}/audios/${name.toLowerCase()}_audio.mp3`
        });
        // Save the story to the database
        const savedStory = await newStory.save();
        logger_1.default.info('Story added:' + JSON.stringify(savedStory));
        return savedStory;
    }
    catch (error) {
        logger_1.default.error('Error adding story: ' + error);
        return null;
    }
};
exports.default = addStory;
