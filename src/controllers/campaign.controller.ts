import { Request, Response } from 'express';
import { wrapAsync } from '../utils/errorHandler.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import { CreateCampaignRequestDto, UpdateCampaignRequestDto } from '../dto/campaign.dto.js';
import { validateAndParseDto } from '../utils/validateAndParseDto.js';
import * as campaignDao from '../dao/campaign.dao.js';
import { ParamIdRequestDto } from '../dto/base.dto.js';

export const createCampaign = wrapAsync(async (req: Request, res: Response) => {
    const [createCampaignRequest, errors] = await validateAndParseDto(CreateCampaignRequestDto, req.body);
    if (errors.length) return errorResponse(res, errors.join(', '), 400);

    const createdCampaign = await campaignDao.create(createCampaignRequest);
    return successResponse(res, createdCampaign, 'Campaign created', 201);
});


export const getCampaignById = wrapAsync(async (req: Request, res: Response) => {
    const [getCampaignByIdRequest, errors] = await validateAndParseDto(ParamIdRequestDto, req.params);
    if (errors.length) return errorResponse(res, errors.join(', '), 400);

    const campaignId = getCampaignByIdRequest.id;
    const campaign = await campaignDao.getById(campaignId);
    if (!campaign) {
        return errorResponse(res, `Campaign with id ${campaignId} does not exists`, 404);
    }

    return successResponse(res, campaign);
});

export const updateCampaignById = wrapAsync(async (req: Request, res: Response) => {
    const [updateCampaignParam, paramErrors] = await validateAndParseDto(ParamIdRequestDto, req.params);
    if (paramErrors.length) return errorResponse(res, paramErrors.join(', '), 400);

    const [updateCampaignRequest, requestErrors] = await validateAndParseDto(UpdateCampaignRequestDto, req.body);
    if (requestErrors.length) return errorResponse(res, requestErrors.join(', '), 400);

    const campaign = await campaignDao.updateById(updateCampaignParam.id, updateCampaignRequest);
    if (!campaign) return errorResponse(res, `Campaign with id ${updateCampaignParam.id} does not exists`, 404);

    return successResponse(res, campaign, 'Campaign updated');
});
