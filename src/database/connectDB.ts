import mongoose from "mongoose";
import logger from "../utils/logger";

export const connectDB = async (mongoURI: string): Promise<true | null> => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as mongoose.ConnectOptions);
        return true; // Explicitly returning 'true' when successful
    } catch (err: unknown) {
        logger.error(err);
        return null; // Explicitly returning 'null' when error occurs
    }
};
