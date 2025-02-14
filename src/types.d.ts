import StoryModel from "./database/models/Story";

export type Story = {
    _id? : string;
    text: string;
    name: string;
    category: string;
};

export type StoryAudio = {
    _id? : string;
    file: Buffer;
    storyID: string;
}