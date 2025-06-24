import { Router } from 'express';
import { CampaignController } from '../controllers/campaign.controller.js';
import { CampaignDao } from '../dao/campaign.dao.js';
import { wrapAsync } from '../utils/errorHandler.js';

const campaignController = new CampaignController(new CampaignDao());

export default Router().post('/', wrapAsync(campaignController.createCampaign.bind(campaignController)))
    .get('/:id', wrapAsync(campaignController.getCampaignById.bind(campaignController)))
    .patch('/:id', wrapAsync(campaignController.updateCampaignById.bind(campaignController)))
    .get('/', wrapAsync(campaignController.getAllCampaigns.bind(campaignController)))
    .delete('/:id', wrapAsync(campaignController.deleteCampaign.bind(campaignController)));
