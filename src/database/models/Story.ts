import mongoose, { Schema, Types } from 'mongoose';
import { Story } from '../../types';

const StorySchema = new Schema({
    _id: { type: Types.ObjectId, auto: true }, // Auto-generate ObjectId
    text: { type: String, required: true },
    title: { type: String, required: true },
    name: { type: String, required: true },
    characterName: { type: String, required: true },
    category: { type: String, required: true },
    thumbnailURL: { type: String, required: true },
    imageURL: { type: String, required: true },
    audioURL: { type: String, required: true }
}); // Prevents Mongoose from auto-adding an _id field

const StoryModel = mongoose.model<Story>('Story', StorySchema);
export default StoryModel;