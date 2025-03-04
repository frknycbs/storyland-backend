import { Types } from "mongoose";
import StoryModel from "./database/models/Story";

export type Story = {
    _id : Types.ObjectId;
    text: string;
    title: string;
    name: string;
    characterName: string;
    category: string;
    thumbnailURL: string;
    audioURL: string;
    imageURL: string;
    disabled?: true | false;
};

export interface AddStoryRequestBody {
    name: string;
    text: string;
    category: string;
}

export interface GooglePurchaseReceipt {
    packageName: string;
    productId: string;
    purchaseToken: string;
    subscription: true | false;
}

export type Category = 'animals' | 'space' | 'nature' | 'cars'