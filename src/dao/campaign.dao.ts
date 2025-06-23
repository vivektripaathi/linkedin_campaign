import { CreateCampaignRequestDto, CampaignResponseDto } from "../dto/campaign.dto.js";
import { validateAndParseDto } from "../utils/validateAndParseDto.js";
import { Campaign } from '../models/campaign.model.js';

export const create = async (campaignRequest: CreateCampaignRequestDto): Promise<CampaignResponseDto> => {
    const createdCampaign = await Campaign.create(campaignRequest);
    console.log(typeof (createdCampaign.createdAt))
    console.log(createdCampaign.createdAt)

    const [createdCampaignResponse, errors] = await validateAndParseDto(CampaignResponseDto, createdCampaign);
    if (errors.length) throw (errors.join(', '));

    return createdCampaignResponse;
};
