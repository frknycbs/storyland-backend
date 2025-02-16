"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoryInfo = void 0;
const constants_1 = require("../assets/constants");
const getCategoryInfo = async (req, res) => {
    try {
        const categoryInfo = [];
        for (const elem of constants_1.constants.categories) {
            categoryInfo.push({ categoryName: elem, bgImageURL: `${process.env.BASE_URL}/category_backgrounds/${elem.toLowerCase()}.jpg` });
        }
        return res.json(categoryInfo);
    }
    catch (error) {
        return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
    }
};
exports.getCategoryInfo = getCategoryInfo;
