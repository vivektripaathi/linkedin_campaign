import { Router } from 'express';
import { wrapAsync } from '../utils/errorHandler.js';
import { WebhookController } from '../controllers/webhook.controller.js';

const webhookController = new WebhookController();

export default Router()
    .post('/on_new_message', wrapAsync(webhookController.onNewMessage.bind(webhookController)))
