"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.health = void 0;
const Story_1 = __importDefault(require("../database/models/Story"));
const health = async (req, res) => {
    try {
        const count = await Story_1.default.countDocuments({});
        if (count === null)
            throw ("Error in DB");
        return res.json({ status: 'OK', count });
    }
    catch (error) {
        return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};
exports.health = health;
