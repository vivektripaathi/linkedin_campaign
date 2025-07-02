import { Router } from 'express';
import { wrapAsync } from '../utils/errorHandler.js';
import { LinkedInMessageController } from '../controllers/linkedin.controller.js';

const linkedinMessageController = new LinkedInMessageController();

export default Router()
    .post('/', wrapAsync(linkedinMessageController.getPersonalizedMessage.bind(linkedinMessageController)))
    .post('/scrap_leads', wrapAsync(linkedinMessageController.scrapLeadProfiles.bind(linkedinMessageController)));
