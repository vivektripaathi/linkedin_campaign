import { Request, Response } from 'express';
import { wrapAsync } from '../utils/errorHandler.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import { CreateCampaignRequestDto, GetCampaignByIdRequestDto } from '../dto/campaign.dto.js';
import { validateAndParseDto } from '../utils/validateAndParseDto.js';
import * as campaignDao from '../dao/campaign.dao.js';

export const createCampaign = wrapAsync(async (req: Request, res: Response) => {
    const [createCampaignRequest, errors] = await validateAndParseDto(CreateCampaignRequestDto, req.body);
    if (errors.length) return errorResponse(res, errors.join(', '), 400);

    const createdCampaign = await campaignDao.create(createCampaignRequest);
    return successResponse(res, createdCampaign, 'Campaign created', 201);
});


export const getCampaignById = wrapAsync(async (req: Request, res: Response) => {
    const [getCampaignByIdRequest, errors] = await validateAndParseDto(GetCampaignByIdRequestDto, req.params);
    if (errors.length) return errorResponse(res, errors.join(', '), 400);

    const campaignId = getCampaignByIdRequest.id;
    const campaign = await campaignDao.getById(campaignId);
    if (!campaign) {
        return errorResponse(res, `Campaign with id ${campaignId} does not exists`, 404);
    }

    return successResponse(res, campaign);
});
