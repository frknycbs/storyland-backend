import { Router } from 'express';
import { getStoryInfo } from '../controllers/getStoryInfoController';
import { getStoriesByCategory } from '../controllers/getStoriesByCategoryController';
import { getStoryAudio } from '../controllers/getStoryAudioController';

const router = Router();

// Story routes
router.get('/story/getStoryInfo', getStoryInfo);
router.get('/story/getStoriesByCategory', getStoriesByCategory);
router.get('/story/getStoryAudio', getStoryAudio);

export default router;
