import { BaseDao } from './base.dao.js';
import { Campaign } from '../models/campaign.model.js';
import { CampaignDomainModel } from '../dto/campaign.dto.js';

export class CampaignDao extends BaseDao<CampaignDomainModel> {
    constructor() {
        super(Campaign);
    }
}
