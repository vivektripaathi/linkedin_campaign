import { Router } from 'express';
import { wrapAsync } from '../utils/errorHandler.js';
import { AccountController } from '../controllers/account.controller.js';
import { AccountDao } from '../dao/account.dao.js';
import { ChatController } from '../controllers/chat.controller.js';
import { UnipileService } from '../services/unipile.service.js';
import { ChatDao } from '../dao/chat.dao.js';
import { MessageController } from '../controllers/message.controller.js';
import { MessageDao } from '../dao/message.dao.js';
import { AttendeeDao } from '../dao/attendee.dao.js';
import { AttendeeController } from '../controllers/attendee.controller.js';

const accountController = new AccountController(
    new AccountDao(),
    new UnipileService(),
    new ChatController(new ChatDao, new UnipileService()),
    new MessageController(
        new MessageDao,
        new UnipileService()
    ),
    new AttendeeController(
        new AttendeeDao(),
        new UnipileService()
    )
);

export default Router()
    .get('', wrapAsync(accountController.getAllAccounts.bind(accountController)))
    .post('/link', wrapAsync(accountController.LinkAccountAndOnboardUser.bind(accountController)))
    .delete('/:id', wrapAsync(accountController.deleteAccount.bind(accountController)))
