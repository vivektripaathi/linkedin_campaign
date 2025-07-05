import { Router } from 'express';
import { wrapAsync } from '../utils/errorHandler.js';
import { ChatController } from '../controllers/chat.controller.js';
import { ChatDao } from '../dao/chat.dao.js';
import { UnipileService } from '../services/unipile.service.js';

const chatController = new ChatController(
    new ChatDao(),
    new UnipileService()
);

export default Router()
    .get('', wrapAsync(chatController.getAllChats.bind(chatController)))
    .get('/:id', wrapAsync(chatController.getChatById.bind(chatController)))
    .post('/:id/messages', wrapAsync(chatController.sendMessage.bind(chatController)))
    .post('/bulk', wrapAsync(chatController.bulkCreateChats.bind(chatController)))
