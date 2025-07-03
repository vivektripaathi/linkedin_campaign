import { BaseDomainModel } from './base.dto.js';

export class ChatDomainModel extends BaseDomainModel {
    accountId!: string;
    attendeeName!: string;
    attendeeProviderId!: string;
    attendeePictureUrl!: string;
}
