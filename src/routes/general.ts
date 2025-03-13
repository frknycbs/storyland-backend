import { Router } from 'express';
import { getStory } from '../controllers/getStoryController';
import { getStoriesByCategory } from '../controllers/getStoriesByCategoryController';
import { addStoryController } from '../controllers/addStoryController';
import { getCategoryInfo } from '../controllers/getCategoryInfoController';
import { health } from '../controllers/healthController';
import { verifyPurchase } from '../controllers/verifyPurchaseController';
import { verifyAvailablePurchases } from '../controllers/verifyAvailablePurchasesController';
import { revokePurchase } from '../controllers/revokePurchaseController';

const router = Router();

// Story routes
// router.get('/story/getStoryInfo', getStory);
// router.get('/story/getStoriesByCategory', getStoriesByCategory);
router.get('/category/getCategoryInfo', getCategoryInfo)
router.get('/health', health);
router.post('/purchase/verifyPurchase', verifyPurchase)
// router.post('/purchase/verifyAvailablePurchases', verifyAvailablePurchases)
router.post('/purchase/revokePurchase', revokePurchase)
// router.post('/story/addStory', addStoryController);

export default router;
