import mongoose, { Schema, Document } from 'mongoose';

interface IAudio extends Document {
  file: Buffer;
  storyID: mongoose.Types.ObjectId;
}

const AudioSchema = new Schema<IAudio>({
  file: { type: Buffer, required: true },
  storyID: { type: Schema.Types.ObjectId, ref: 'Story', required: true }
});

const Audio = mongoose.model<IAudio>('Audio', AudioSchema);
export default Audio;