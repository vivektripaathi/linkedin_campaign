import { Request, Response } from 'express';
import { successResponse } from '../utils/apiResponse.js';
import { validateAndParseDto } from '../utils/validateAndParseDto.js';
import { LeadDao } from '../dao/lead.dao.js';
import {
    CreateLeadRequestDto,
    LeadDomainModel,
    LeadResponseDto,
} from '../dto/lead.dto.js';
import { InvalidRequestException, BadResponseException } from '../utils/exceptions.js';
import crypto from 'crypto';

export class LeadController {
    constructor(private readonly leadDao: LeadDao) { }


    private async _validateAndPrepareLeadPayloads(createLeadsRequest: any[]): Promise<LeadDomainModel[]> {
        const validLeads: LeadDomainModel[] = [];

        for (const [index, leadRequest] of createLeadsRequest.entries()) {
            const [leadDto, errors] = await validateAndParseDto(CreateLeadRequestDto, leadRequest);
            if (errors.length) {
                throw new InvalidRequestException(`Validation error in lead at index ${index}: ${errors.join(', ')}`);
            }

            const domainLead: LeadDomainModel = {
                _id: crypto.randomUUID(),
                fullName: leadDto.fullName,
                location: leadDto.location,
                profilePic: leadDto.profilePic,
                profileUrl: leadDto.profileUrl,
                companyName: leadDto.companyName,
                currentJobTitle: leadDto.currentJobTitle,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            };
            validLeads.push(domainLead);
        }

        return validLeads;
    }


    private async _validateLeadResponses(createdLeads: LeadDomainModel[]): Promise<LeadResponseDto[]> {
        const validatedResponses: LeadResponseDto[] = [];

        for (const [index, lead] of createdLeads.entries()) {
            const [validated, responseErrors] = await validateAndParseDto(LeadResponseDto, lead);
            if (responseErrors.length) {
                throw new BadResponseException(`Response validation failed at index ${index}: ${responseErrors.join(', ')}`);
            }
            validatedResponses.push(validated);
        }

        return validatedResponses;
    }


    async bulkCreateLeads(req: Request, res: Response) {
        const createLeadsRequest = Array.isArray(req.body) ? req.body : [];
        if (!createLeadsRequest.length) {
            throw new InvalidRequestException('Request body must be a non-empty array of leads');
        }

        const validLeads = await this._validateAndPrepareLeadPayloads(createLeadsRequest);
        const createdLeads = await this.leadDao.bulkCreate(validLeads);
        const response = await this._validateLeadResponses(createdLeads);

        return successResponse(res, response, 201);
    }
}
