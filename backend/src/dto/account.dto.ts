import { BaseDomainModel } from './base.dto.js';

export class AccountDomainModel extends BaseDomainModel {
    name!: string;
    username!: string;
    providerId!: string;
    publicIdentifier!: string;
    attendeeProviderId!: string;
}
