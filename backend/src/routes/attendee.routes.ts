import { Router } from 'express';
import { wrapAsync } from '../utils/errorHandler.js';
import { UnipileService } from '../services/unipile.service.js';
import { AttendeeController } from '../controllers/attendee.controller.js';
import { AttendeeDao } from '../dao/attendee.dao.js';

const attendeeController = new AttendeeController(
    new AttendeeDao(),
    new UnipileService()
);

export default Router()
    .get('', wrapAsync(attendeeController.getAllAttendees.bind(attendeeController)))
