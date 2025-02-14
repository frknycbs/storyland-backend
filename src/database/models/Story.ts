import mongoose, { Schema, Document } from 'mongoose';
import { Story } from '../../types';

const StorySchema = new Schema<Story>({
    text: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true }
});

const StoryModel = mongoose.model<Story>('Story', StorySchema);
export default StoryModel;