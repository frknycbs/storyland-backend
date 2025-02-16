import { Types } from "mongoose";
import StoryModel from "./database/models/Story";

export type Story = {
    _id : Types.ObjectId;
    text: string;
    title: string;
    name: string;
    category: string;
    thumbnailURL: string;
    audioURL: string;
    imageURL: string;
};

export interface AddStoryRequestBody {
    name: string;
    text: string;
    category: string;
}

export type Category = 'animals' | 'space' | 'nature' | 'cars'