import { BaseDao } from './base.dao.js';
import { Chat } from '../models/chat.model.js';
import { ChatDomainModel } from '../dto/chat.dto.js';

export class ChatDao extends BaseDao<ChatDomainModel> {
    constructor() {
        super(Chat);
    }

    async deleteByAccountId(accountId: string) {
        return this.model.deleteMany({ accountId });
    }
}
