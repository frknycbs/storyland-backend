import mongoose, { Schema, Document } from 'mongoose';
import { StoryAudio } from '../../types';

const StoryAudioSchema = new Schema<StoryAudio>({
    file: { type: Buffer, required: true },
    storyID: { type: String, required: true }
});

const StoryAudioModel = mongoose.model<StoryAudio>('StoryAudio', StoryAudioSchema);
export default StoryAudioModel;