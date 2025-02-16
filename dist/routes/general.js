"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getStoryController_1 = require("../controllers/getStoryController");
const getStoriesByCategoryController_1 = require("../controllers/getStoriesByCategoryController");
const getCategoryInfoController_1 = require("../controllers/getCategoryInfoController");
const router = (0, express_1.Router)();
// Story routes
router.get('/story/getStoryInfo', getStoryController_1.getStory);
router.get('/story/getStoriesByCategory', getStoriesByCategoryController_1.getStoriesByCategory);
router.get('/category/getCategoryInfo', getCategoryInfoController_1.getCategoryInfo);
// router.post('/story/addStory', addStoryController);
exports.default = router;
