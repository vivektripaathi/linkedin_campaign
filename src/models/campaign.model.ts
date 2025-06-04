import { model, Model, Schema } from 'mongoose';
import { CampaignDomainModel, campaignStatusEnum } from '../dto/campaign.dto.js';
import { v4 as uuidV4 } from 'uuid';

const campaignSchema = new Schema<CampaignDomainModel>({
    _id: {
        type: String,
        default: uuidV4,
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: {
        type: String,
        enum: campaignStatusEnum,
        required: true,
        default: campaignStatusEnum.ACTIVE,
    },
    leads: {
        type: [String],
        required: true,
        default: []
    },
    accountIDs: {
        type: [String],
        required: true,
        default: []
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, { collection: 'campaigns', timestamps: true });

export const Campaign: Model<CampaignDomainModel> = model('Campaign', campaignSchema);
