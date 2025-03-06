"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getCategoryInfoController_1 = require("../controllers/getCategoryInfoController");
const healthController_1 = require("../controllers/healthController");
const verifyPurchaseController_1 = require("../controllers/verifyPurchaseController");
const verifyAvailablePurchasesController_1 = require("../controllers/verifyAvailablePurchasesController");
const router = (0, express_1.Router)();
// Story routes
// router.get('/story/getStoryInfo', getStory);
// router.get('/story/getStoriesByCategory', getStoriesByCategory);
router.get('/category/getCategoryInfo', getCategoryInfoController_1.getCategoryInfo);
router.get('/health', healthController_1.health);
router.post('/purchase/verifyPurchase', verifyPurchaseController_1.verifyPurchase);
router.post('/purchase/verifyAvailablePurchases', verifyAvailablePurchasesController_1.verifyAvailablePurchases);
// router.post('/story/addStory', addStoryController);
exports.default = router;
