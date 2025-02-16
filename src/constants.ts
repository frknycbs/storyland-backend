import { Category } from "./types";

export const constants = {
    categories: ["animals", "cars", "nature", "space"] as Category[],
    REMOTE_MONGO_URI: process.env.REMOTE_MONGO_URI || "mongodb://192.236.195.254:27017/storytelling"
}