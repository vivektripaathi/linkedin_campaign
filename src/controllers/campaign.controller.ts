import { Request, Response } from 'express';
import { wrapAsync } from '../utils/errorHandler.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import { CreateCampaignRequestDto } from '../dto/campaign.dto.js';
import { validateAndParseDto } from '../utils/validateAndParseDto.js';
import * as campaignDao from '../dao/campaign.dao.js';

export const createCampaign = wrapAsync(async (req: Request, res: Response) => {
    const [createCampaignRequest, errors] = await validateAndParseDto(CreateCampaignRequestDto, req.body);
    if (errors.length) return errorResponse(res, errors.join(', '), 400);

    const campaign = await campaignDao.create(createCampaignRequest);
    return successResponse(res, campaign, 'Campaign created', 201);
});
