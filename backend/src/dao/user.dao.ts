import { BaseDao } from './base.dao.js';
import { User } from '../models/user.model.js';
import { UserDomainModel } from '../dto/user.dto.js';

export class UserDao extends BaseDao<UserDomainModel> {
    constructor() {
        super(User);
    }

    async findByEmail(email: string): Promise<UserDomainModel | null> {
        return User.findOne({ email });
    }
}
