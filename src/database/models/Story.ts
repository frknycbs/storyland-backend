import mongoose, { Schema, Document } from 'mongoose';

interface IStory extends Document {
  text: string;
  name: string;
  category: string;
}

const StorySchema = new Schema<IStory>({
  text: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true }
});

const Story = mongoose.model<IStory>('Story', StorySchema);
export default Story;