import mongoose, { Schema, Types } from 'mongoose';
import { GooglePlayPurchaseReceiptDB } from '../../types';

const GooglePlayPurchaseReceiptSchema = new Schema({
    // _id is purchaseToken
    _id: { type: String, required: true },
    packageName: { type: String, required: true },
    productId: { type: String, required: true },
    orderId: { type: String, required: true }
}); // Prevents Mongoose from auto-adding an _id field

const GooglePlayPurchaseReceiptModel = mongoose.model<GooglePlayPurchaseReceiptDB>('GooglePlayPurchaseReceipt', GooglePlayPurchaseReceiptSchema);
export default GooglePlayPurchaseReceiptModel;