import { Router } from "express";
import { wrapAsync } from "../utils/errorHandler.js";
import { MessageController } from "../controllers/message.controller.js";
import { MessageDao } from "../dao/message.dao.js";
import { UnipileService } from "../services/unipile.service.js";

const messageController = new MessageController(
    new MessageDao(),
    new UnipileService()
);

export default Router()
    .get('', wrapAsync(messageController.getAllMessages.bind(messageController)))
    .post('/bulk', wrapAsync(messageController.bulkCreateMessages.bind(messageController)))
