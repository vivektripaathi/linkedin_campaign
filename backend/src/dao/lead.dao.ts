import { BaseDao } from './base.dao.js';
import { Lead } from '../models/lead.model.js';
import { LeadDomainModel } from '../dto/lead.dto.js';

export class LeadDao extends BaseDao<LeadDomainModel> {
    constructor() {
        super(Lead);
    }
}
