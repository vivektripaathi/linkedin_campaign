import { Router } from 'express';
import {
  getAllCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaignById,
  deleteCampaign
} from '../controllers/campaign.controller.js';

const router = Router();

router.get('/', getAllCampaigns);
router.get('/:id', getCampaignById);
router.post('/', createCampaign);
router.put('/:id', updateCampaignById);
router.delete('/:id', deleteCampaign);

export default router;
