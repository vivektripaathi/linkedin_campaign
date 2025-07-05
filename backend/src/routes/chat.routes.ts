import { Router } from 'express';
import { wrapAsync } from '../utils/errorHandler.js';
import { ChatController } from '../controllers/chat.controller.js';
import { ChatDao } from '../dao/chat.dao.js';

const chatController = new ChatController(new ChatDao());

export default Router()
    .get('', wrapAsync(chatController.getAllChats.bind(chatController)))
    .post('/bulk', wrapAsync(chatController.bulkCreateChats.bind(chatController)))
