import { Router } from 'express';
import { createCampaign } from '../controllers/campaign.controller.js';

const router = Router();

router.get('/:id', getCampaignById);
router.post('/', createCampaign);

export default router;
