import { BaseDao } from './base.dao.js';
import { AccountDomainModel } from '../dto/account.dto.js';
import { Account } from '../models/account.model.js';

export class AccountDao extends BaseDao<AccountDomainModel> {
    constructor() {
        super(Account);
    }
}
