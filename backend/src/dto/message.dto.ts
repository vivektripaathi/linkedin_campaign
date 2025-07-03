import { BaseDomainModel } from './base.dto.js';

export class MessageDomainModel extends BaseDomainModel {
    text!: string;
    chatId!: string;
    timestamp!: Date;
    senderProviderId!: string;
}
