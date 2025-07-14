import { model, Model, Schema } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';
import { AttendeeDomainModel } from '../dto/attendee.dto.js';

const AttendeeSchema = new Schema<AttendeeDomainModel>({
    _id: {
        type: String,
        default: uuidV4,
    },
    accountId: { type: String, required: true },
    name: { type: String, required: true },
    providerId: { type: String, required: true },
    pictureUrl: { type: String },
    profileUrl: { type: String },
    deletedAt: { type: Date, default: null },
}, { collection: 'attendees', timestamps: true });

export const Attendee: Model<AttendeeDomainModel> = model('Attendee', AttendeeSchema);
