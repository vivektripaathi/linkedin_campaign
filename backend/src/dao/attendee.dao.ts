import { BaseDao } from './base.dao.js';
import { Attendee } from '../models/attendee.model.js';
import { AttendeeDomainModel } from '../dto/attendee.dto.js';

export class AttendeeDao extends BaseDao<AttendeeDomainModel> {
    constructor() {
        super(Attendee);
    }

    async findByProviderId(providerId: string) {
        return this.model.findOne({ 
            providerId, 
            deletedAt: null 
        });
    }

    async deleteByAccountId(accountId: string) {
        return this.model.deleteMany({ accountId });
    }
}
