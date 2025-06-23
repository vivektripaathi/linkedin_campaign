import { Request, Response } from 'express';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import { CampaignDao } from '../dao/campaign.dao.js';
import { validateAndParseDto } from '../utils/validateAndParseDto.js';
import {
    CreateCampaignRequestDto,
    CampaignDomainModel,
    CampaignResponseDto,
    UpdateCampaignRequestDto
} from '../dto/campaign.dto.js';
import { ParamIdRequestDto } from '../dto/base.dto.js';

export class CampaignController {
    constructor(private readonly campaignDao: CampaignDao) { }

    private prepareDomainModelFromCreateDto(dto: CreateCampaignRequestDto): CampaignDomainModel {
        return {
            name: dto.name,
            description: dto.description,
            status: dto.status,
            leads: dto.leads,
            accountIDs: dto.accountIDs,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: dto.deletedAt ?? null,
            _id: undefined as any
        };
    }


    async createCampaign(req: Request, res: Response) {
        //create campaign request validation
        const [createRequest, errors] = await validateAndParseDto(CreateCampaignRequestDto, req.body);
        if (errors.length) return errorResponse(res, errors.join(', '), 400);

        //prepare domain model from create request and create campaign
        const createCampaignPayload = this.prepareDomainModelFromCreateDto(createRequest);
        const createdCampaign = await this.campaignDao.create(createCampaignPayload);

        //validate and parse response and return response
        const [response, responseErrors] = await validateAndParseDto(CampaignResponseDto, createdCampaign);
        if (responseErrors.length) return errorResponse(res, responseErrors.join(', '), 500);
        return successResponse(res, response, 'Campaign created', 201);
    };


    async getCampaignById(req: Request, res: Response) {
        const [getRequest, errors] = await validateAndParseDto(ParamIdRequestDto, req.params);
        if (errors.length) return errorResponse(res, errors.join(', '), 400);

        const campaign = await this.campaignDao.getById(getRequest.id);
        if (!campaign) return errorResponse(res, `Campaign with id ${getRequest.id} not found`, 404);

        const [response, responseErrors] = await validateAndParseDto(CampaignResponseDto, campaign);
        if (responseErrors.length) return errorResponse(res, responseErrors.join(', '), 500);
        return successResponse(res, response);
    };



    async updateCampaignById(req: Request, res: Response) {
        const [updateParam, paramErrors] = await validateAndParseDto(ParamIdRequestDto, req.params);
        if (paramErrors.length) return errorResponse(res, paramErrors.join(', '), 400);
        const [updateRequest, dtoErrors] = await validateAndParseDto(UpdateCampaignRequestDto, req.body);
        if (dtoErrors.length) return errorResponse(res, dtoErrors.join(', '), 400);

        const updated = await this.campaignDao.updateById(updateParam.id, updateRequest);
        if (!updated) return errorResponse(res, `Campaign with id ${updateParam.id} not found`, 404);

        const [response, responseErrors] = await validateAndParseDto(CampaignResponseDto, updated);
        if (responseErrors.length) return errorResponse(res, responseErrors.join(', '), 500);
        return successResponse(res, response, 'Campaign updated');
    };


    async getAllCampaigns(_: Request, res: Response) {
        const campaigns = await this.campaignDao.getAll();

        const validatedList: CampaignResponseDto[] = [];
        for (const campaign of campaigns) {
            const [validated, errors] = await validateAndParseDto(CampaignResponseDto, campaign);
            if (errors.length) return errorResponse(res, errors.join(', '), 500);
            validatedList.push(validated);
        }
        return successResponse(res, validatedList);
    };

    async deleteCampaign(req: Request, res: Response) {
        const [deleteParams, errors] = await validateAndParseDto(ParamIdRequestDto, req.params);
        if (errors.length) return errorResponse(res, errors.join(', '), 400);

        const updated = await this.campaignDao.updateById(deleteParams.id, { deletedAt: new Date() });
        if (!updated) return errorResponse(res, `Campaign with id ${deleteParams.id} not found`, 404);

        return successResponse(res, null, 'Campaign soft-deleted');
    };
}
