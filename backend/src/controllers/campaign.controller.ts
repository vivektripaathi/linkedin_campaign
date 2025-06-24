import { Request, Response } from 'express';
import { successResponse } from '../utils/apiResponse.js';
import { CampaignDao } from '../dao/campaign.dao.js';
import { validateAndParseDto } from '../utils/validateAndParseDto.js';
import {
    CreateOrUpdateCampaignRequestDto,
    CampaignDomainModel,
    CampaignResponseDto,
} from '../dto/campaign.dto.js';
import { ParamIdRequestDto } from '../dto/base.dto.js';
import { BadResponseException, InvalidRequestException, NotFoundException } from '../utils/exceptions.js';

export class CampaignController {
    constructor(private readonly campaignDao: CampaignDao) { }


    private _prepareCreateCampaignPayload(dto: CreateOrUpdateCampaignRequestDto): CampaignDomainModel {
        return {
            _id: crypto.randomUUID(),
            name: dto.name,
            description: dto.description,
            status: dto.status,
            leads: dto.leads,
            accountIDs: dto.accountIDs,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        };
    }


    async createCampaign(req: Request, res: Response) {
        //create campaign request validation
        const [createRequest, errors] = await validateAndParseDto(CreateOrUpdateCampaignRequestDto, req.body ?? {});
        if (errors.length) throw new InvalidRequestException(errors.join(', '));

        //prepare domain model from create request and create campaign
        const createCampaignPayload = this._prepareCreateCampaignPayload(createRequest);
        const createdCampaign = await this.campaignDao.create(createCampaignPayload);

        //validate and parse response and return response
        const [response, responseErrors] = await validateAndParseDto(CampaignResponseDto, createdCampaign);
        if (responseErrors.length) throw new BadResponseException(responseErrors.join(', '));
        return successResponse(res, response, 201);
    };


    async getCampaignById(req: Request, res: Response) {
        const [getRequest, errors] = await validateAndParseDto(ParamIdRequestDto, req.params);
        if (errors.length) throw new InvalidRequestException(errors.join(', '));

        const campaign = await this.campaignDao.getById(getRequest.id);
        if (!campaign) throw new NotFoundException(`Campaign with id ${getRequest.id} not found`);

        const [response, responseErrors] = await validateAndParseDto(CampaignResponseDto, campaign);
        if (responseErrors.length) throw new BadResponseException(responseErrors.join(', '));
        return successResponse(res, response, 200);
    };


    private _prepareUpdateCampaignPayload(
        dto: Omit<CreateOrUpdateCampaignRequestDto, '_id'>,
        campaignEntry: CampaignDomainModel
    ): Omit<CampaignDomainModel, '_id'> {
        return {
            name: dto.name,
            description: dto.description,
            status: dto.status,
            leads: dto.leads,
            accountIDs: dto.accountIDs,
            createdAt: campaignEntry.createdAt,
            updatedAt: new Date(),
            deletedAt: campaignEntry.deletedAt,
        };
    }


    async updateCampaignById(req: Request, res: Response) {
        //validate and parse id from request params
        const [updateParam, paramErrors] = await validateAndParseDto(ParamIdRequestDto, req.params);
        if (paramErrors.length) throw new InvalidRequestException(paramErrors.join(', '));

        //validate and parse request body
        const [updateRequest, dtoErrors] = await validateAndParseDto(CreateOrUpdateCampaignRequestDto, req.body ?? {});
        if (dtoErrors.length) throw new InvalidRequestException(dtoErrors.join(', '));

        //check if campaign exists
        const campaignEntry = await this.campaignDao.getById(updateParam.id);
        if (!campaignEntry) throw new NotFoundException(`Campaign with id ${updateParam.id} not found`);

        //prepare update payload and send update request to dao
        const updatePayload = this._prepareUpdateCampaignPayload(updateRequest, campaignEntry);
        const updatedCampaign = await this.campaignDao.updateById(updateParam.id, updatePayload);
        if (!updatedCampaign) throw new NotFoundException(`Campaign with id ${updateParam.id} not found`);

        //validate and parse response and return response
        const [response, responseErrors] = await validateAndParseDto(CampaignResponseDto, updatedCampaign);
        if (responseErrors.length) throw new BadResponseException(responseErrors.join(', '));
        return successResponse(res, response, 200);
    };


    async getAllCampaigns(_: Request, res: Response) {
        const campaigns = await this.campaignDao.getAll();

        const validatedList: CampaignResponseDto[] = [];
        for (const campaign of campaigns) {
            const [validated, errors] = await validateAndParseDto(CampaignResponseDto, campaign);
            if (errors.length) throw new BadResponseException(errors.join(', '));
            validatedList.push(validated);
        }
        return successResponse(res, validatedList, 200);
    };

    async deleteCampaign(req: Request, res: Response) {
        const [deleteParams, errors] = await validateAndParseDto(ParamIdRequestDto, req.params);
        if (errors.length) throw new InvalidRequestException(errors.join(', '));

        const updated = await this.campaignDao.deleteById(deleteParams.id);
        if (!updated) throw new NotFoundException(`Campaign with id ${deleteParams.id} not found`);

        return successResponse(res, undefined, 204);
    };
}
