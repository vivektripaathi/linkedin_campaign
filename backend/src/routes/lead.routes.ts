import { Router } from 'express';
import { wrapAsync } from '../utils/errorHandler.js';
import { LeadController } from '../controllers/lead.controller.js';
import { LeadDao } from '../dao/lead.dao.js';

const leadController = new LeadController(new LeadDao());

export default Router()
    .post('/bulk', wrapAsync(leadController.bulkCreateLeads.bind(leadController)))
    .get('/', wrapAsync(leadController.getAllLeads.bind(leadController)))
