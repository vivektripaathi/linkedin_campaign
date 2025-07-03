import { model, Model, Schema } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';
import { AccountDomainModel } from '../dto/account.dto.js';

const AccountSchema = new Schema<AccountDomainModel>({
    _id: {
        type: String,
        default: uuidV4,
    },
    name: { type: String, required: true },
    username: { type: String, required: true },
    providerId: { type: String, required: true },
    publicIdentifier: { type: String, required: true },
    attendeeProviderId: { type: String, required: true },
}, { collection: 'accounts', timestamps: true });

export const Account: Model<AccountDomainModel> = model('Account', AccountSchema);
