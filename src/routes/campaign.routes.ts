import { Router } from 'express';
import { createCampaign } from '../controllers/campaign.controller.js';

const router = Router();

router.post('/', createCampaign);

export default router;
