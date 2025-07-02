import { Request, Response } from 'express';
import { successResponse } from '../utils/apiResponse.js';

export class WebhookController {

    constructor() { }

    async onNewMessage(req: Request, res: Response) {
        console.log('Received webhook data:', req.body);
        return successResponse(res, { 'Received webhook data': req.body }, 200);
    }
}
