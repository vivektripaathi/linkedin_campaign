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

export const getById = async (campaignId: UUIDTypes): Promise<CampaignResponseDto | null> => {
    const campaignDbEntry = await Campaign.findById(campaignId);
    if (campaignDbEntry) {
        const [campaignResponse, errors] = await validateAndParseDto(CampaignResponseDto, campaignDbEntry);
        if (errors.length) throw (errors.join(', '));
        return campaignResponse;
    }
    return campaignDbEntry;
}

export const updateById = async (campaignId: UUIDTypes, updateRequest: UpdateCampaignRequestDto): Promise<CampaignResponseDto | null> => {
    const campaignExists = !!(await getById(campaignId));
    if (!campaignExists) return null;

    const updatedCampaign = await Campaign.findByIdAndUpdate(campaignId, updateRequest, { new: true });

    const [updatedCampaignResponse, errors] = await validateAndParseDto(CampaignResponseDto, updatedCampaign as CampaignResponseDto);
    if (errors.length) throw (errors.join(', '));

    return updatedCampaignResponse;
}

export const getAll = async (): Promise<CampaignResponseDto[]> => {
    const campaignDbEntries = await Campaign.find();

    const validatedCampaigns: CampaignResponseDto[] = [];
    for (const campaign of campaignDbEntries) {
        const [validatedCampaign, errors] = await validateAndParseDto(CampaignResponseDto, campaign);
        if (errors.length) throw new Error(errors.join(', '));
        validatedCampaigns.push(validatedCampaign);
    }

    return validatedCampaigns;
};
