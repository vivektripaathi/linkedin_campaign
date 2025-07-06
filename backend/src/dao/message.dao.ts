import { BaseDao } from './base.dao.js';
import { Message } from '../models/message.model.js';
import { MessageDomainModel } from '../dto/message.dto.js';

export class MessageDao extends BaseDao<MessageDomainModel> {
    constructor() {
        super(Message);
    }

    async deleteByAccountId(accountId: string) {
        return this.model.deleteMany({ accountId });
    }
}
