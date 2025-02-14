"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getStoryInfoController_1 = require("../controllers/getStoryInfoController");
const getStoriesByCategoryController_1 = require("../controllers/getStoriesByCategoryController");
const getStoryAudioController_1 = require("../controllers/getStoryAudioController");
const router = (0, express_1.Router)();
// Story routes
router.get('/story/getStoryInfo', getStoryInfoController_1.getStoryInfo);
router.get('/story/getStoriesByCategory', getStoriesByCategoryController_1.getStoriesByCategory);
router.get('/story/getStoryAudio', getStoryAudioController_1.getStoryAudio);
exports.default = router;
