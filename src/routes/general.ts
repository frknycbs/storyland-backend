import { Router } from 'express';
import { getStory } from '../controllers/getStoryController';
import { getStoriesByCategory } from '../controllers/getStoriesByCategoryController';
import { addStoryController } from '../controllers/addStoryController';
import { getCategoryInfo } from '../controllers/getCategoryInfoController';

const router = Router();

// Story routes
router.get('/story/getStoryInfo', getStory);
router.get('/story/getStoriesByCategory', getStoriesByCategory);
router.get('/category/getCategoryInfo', getCategoryInfo)
// router.post('/story/addStory', addStoryController);

export default router;
