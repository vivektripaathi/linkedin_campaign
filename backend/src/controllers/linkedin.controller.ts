import { Request, Response } from 'express';
import { successResponse } from '../utils/apiResponse.js';
import { validateAndParseDto } from '../utils/validateAndParseDto.js';
import { LinkedInMessageService } from '../services/linkedin.service.js';
import { LinkedInLeadScrapeRequestDto, LinkedInProfileRequestDto } from '../dto/linkedin.dto.js';
import { InvalidRequestException } from '../utils/exceptions.js';

export class LinkedInMessageController {
    private linkedInMessageService: LinkedInMessageService

    constructor() {
        this.linkedInMessageService = new LinkedInMessageService()
    }


    async getPersonalizedMessage(req: Request, res: Response) {
        const [profile, errors] = await validateAndParseDto(LinkedInProfileRequestDto, req.body ?? {});
        if (errors.length) throw new InvalidRequestException(errors.join(', '));

        const message = await this.linkedInMessageService.generatePersonalizedMessage(profile);
        return successResponse(res, { message }, 200);
    }


    async scrapLeadProfiles(req: Request, res: Response) {
        const [request, errors] = await validateAndParseDto(LinkedInLeadScrapeRequestDto, req.body ?? {});
        if (errors.length) throw new InvalidRequestException(errors.join(', '));

        const leads = await this.linkedInMessageService.scrapLeadProfiles(request.searchUrl);
        return successResponse(res, { leads }, 200);
    }
}
