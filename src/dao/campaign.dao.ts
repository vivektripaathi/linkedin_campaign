import { CreateCampaignRequestDto, CampaignResponseDto, UpdateCampaignRequestDto } from "../dto/campaign.dto.js";
import { validateAndParseDto } from "../utils/validateAndParseDto.js";
import { Campaign } from '../models/campaign.model.js';
import { UUIDTypes } from "uuid";

export const create = async (campaignRequest: CreateCampaignRequestDto): Promise<CampaignResponseDto> => {
    const createdCampaign = await Campaign.create(campaignRequest);

    const [createdCampaignResponse, errors] = await validateAndParseDto(CampaignResponseDto, createdCampaign);
    if (errors.length) throw (errors.join(', '));

    return createdCampaignResponse;
};

export const getById = async (campaignId: UUIDTypes): Promise<CampaignResponseDto | null> => await Campaign.findById(campaignId);

export const updateById = async (campaignId: UUIDTypes, updateRequest: UpdateCampaignRequestDto): Promise<CampaignResponseDto | null> => {
    const campaignExists = !!(await getById(campaignId));
    if (!campaignExists) return null;

    const updatedCampaign = await Campaign.findByIdAndUpdate(campaignId, updateRequest, { new: true });

    const [updatedCampaignResponse, errors] = await validateAndParseDto(CampaignResponseDto, updatedCampaign as CampaignResponseDto);
    if (errors.length) throw (errors.join(', '));

    return updatedCampaignResponse;
}
