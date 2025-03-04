"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.health = void 0;
const health = async (req, res) => {
    try {
        return res.json({ status: 'OK' });
    }
    catch (error) {
        return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};
exports.health = health;
