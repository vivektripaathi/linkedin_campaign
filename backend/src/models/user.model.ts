import { model, Model, Schema } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';
import { UserDomainModel } from '../dto/user.dto.js';

const UserSchema = new Schema<UserDomainModel>({
    _id: {
        type: String,
        default: uuidV4,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { collection: 'users', timestamps: true });

export const User: Model<UserDomainModel> = model('User', UserSchema); 