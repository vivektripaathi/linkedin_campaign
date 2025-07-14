import { Router } from 'express';
import { wrapAsync } from '../utils/errorHandler.js';
import { WebhookController } from '../controllers/webhook.controller.js';
import { ChatController } from '../controllers/chat.controller.js';
import { MessageController } from '../controllers/message.controller.js';
import { ChatDao } from '../dao/chat.dao.js';
import { MessageDao } from '../dao/message.dao.js';
import { UnipileService } from '../services/unipile.service.js';
import { AccountController } from '../controllers/account.controller.js';
import { AccountDao } from '../dao/account.dao.js';
import { AttendeeController } from '../controllers/attendee.controller.js';
import { AttendeeDao } from '../dao/attendee.dao.js';

const webhookController = new WebhookController(
    new ChatController(
        new ChatDao, new UnipileService()
    ),
    new MessageController(
        new MessageDao,
        new UnipileService()
    ),
    new AccountController(
        new AccountDao,
        new UnipileService(),
        new ChatController(new ChatDao(), new UnipileService()),
        new MessageController(
            new MessageDao(),
            new UnipileService()
        ),
        new AttendeeController(
            new AttendeeDao(),
            new UnipileService()
        )
    )
);

export default Router()
    .post('/on_new_message', wrapAsync(webhookController.onNewMessage.bind(webhookController)))
