import { Types } from "mongoose";
import StoryModel from "./database/models/Story";

export interface Story {
    _id : Types.ObjectId;
    text: string;
    title: string;
    name: string;
    characterName: string;
    category: Category;
    thumbnailURL: string;
    disabledThumbnailURL: string;
    audioURL: string;
    imageURL: string;
    free: boolean;
    disabled?: boolean
}

export interface AddStoryRequestBody {
    name: string;
    text: string;
    category: string;
}

export interface GooglePlayVerifyPurchaseRequestBody {
    purchaseToken: string;
    productId: string;
    packageName: string;
    orderId: string;
}

export interface GooglePlayPurchaseReceipt {
    developerPayloadAndroid: string; // ""
    packageNameAndroid: string; // "com.j_terry.StoryLandFront"
    purchaseStateAndroid: number; // 1
    obfuscatedProfileIdAndroid: string; // ""
    autoRenewingAndroid: boolean; // false
    isAcknowledgedAndroid: boolean; // false
    signatureAndroid: string; // "n+ED7Fzla+OmA96OmyaFdwa2DbBEkzX4SObNpn5IKBWavPRkAtM9eAuVnLCvxlinCbhU2Iqe0
        // qtGgf95nnN/o+o2afv8/EeQPLupqiU5K7ApU7NYt09yrcI8Jl8PJD/g+3skXCr4vnicZhgPy1oF5T3O4IxACbPnCfDetUChP6
        // 7HOLPJzT9vYZBTixI8cJBhQ6FN43ps+r4RuoDYUwf9HIL/ckdXLh5IuvoWBfJQHQHCTDxwZck+ZLAdCmARNHC6xID4JxttQBf
        // yY8qwjoKo0V5KBeDdgtHLLiNiJ1lbd8ghf0Xd2gkYDk2dDJ8mDEC+fnp/al3KQdbyOaa6FhiAsA=="

    dataAndroid: string; // "{\"orderId\":\"GPA.3325-6870-5718-77771\",\"packageName\":\"com.j_terry.StoryLandFront\",
        // \"productId\":\"test_product\",\"purchaseTime\":1741178183947,\"purchaseState\":0,
        // \"purchaseToken\":\"ophheechdfbmbffdcccdfdof.AO-J1OyH489yJNHap6_QfT0hziV_4PElf3j1DGqERl1R9UQoU0_13acmwU0yyvKstaBzykWm1adVa2aFdtfXx61TVJnpAJBNE44zC6SvO8LLawQyjJqDVvM\",
        // \"quantity\":1,\"acknowledged\":false}"

    obfuscatedAccountIdAndroid: string; // ""
    productId: string; // "test_product"
    transactionReceipt: string; // "{\"orderId\":\"GPA.3325-6870-5718-77771\",\"packageName\":\"com.j_terry.StoryLandFront\",\"productId\":\"test_product\",
        // \"purchaseTime\":1741178183947,\"purchaseState\":0,
        // \"purchaseToken\":\"ophheechdfbmbffdcccdfdof.AO-J1OyH489yJNHap6_QfT0hziV_4PElf3j1DGqERl1R9UQoU0_13acmwU0yyvKstaBzykWm1adVa2aFdtfXx61TVJnpAJBNE44zC6SvO8LLawQyjJqDVvM\",
        // \"quantity\":1,\"acknowledged\":false}"
    transactionId: string; // "GPA.3325-6870-5718-77771"
    transactionDate: number; // 1741178183947
    purchaseToken: string; // "ophheechdfbmbffdcccdfdof.AO-J1OyH489yJNHap6_QfT0hziV_4PElf3j1DGqERl1R9UQoU0_13acmwU0yyvKstaBzykWm1adVa2aFdtfXx61TVJnpAJBNE44zC6SvO8LLawQyjJqDVvM"
    productIds: Array<string>; // ["test_product"]
}

export interface GooglePlayPurchaseReceiptResponse {
    purchaseTimeMillis: string; // "1741178183947",
    purchaseState: number; // 0 for purchase completed, 1 for canceled, 2 for pending
    consumptionState: number; // 0 for yet to be consumed, 1 for consumed
    developerPayload: string; // "",
    orderId: string; // "GPA.3325-6870-5718-77771"
    acknowledgementState: number // 0. Yet to be acknowledged 1. Acknowledged
    kind: string; // "androidpublisher#productPurchase",
    regionCode: string; // "TR"
}

export interface GooglePlayPurchaseReceiptDB {
    _id: string; // "ophheechdfbmbffdcccdfdof.AO-J1OyH489yJNHap6_QfT0hziV_4PElf3j1DGqERl1R9UQoU0_13acmwU0yyvKstaBzykWm1adVa2aFdtfXx61TVJnpAJBNE44zC6SvO8LLawQyjJqDVvM"
    packageName: string;
    productId: string;
    orderId: string;
}

export type Category = 'animals' | 'space' | 'nature' | 'vehicles' | 'toys'