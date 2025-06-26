import { model, Model, Schema } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';
import { LeadDomainModel } from '../dto/lead.dto.js';

const LeadSchema = new Schema<LeadDomainModel>({
    _id: {
        type: String,
        default: uuidV4,
    },
    fullName: { type: String, required: true },
    location: { type: String, required: true },
    profilePic: { type: String, required: true },
    profileUrl: { type: String, required: true },
    companyName: { type: String, required: true },
    currentJobTitle: { type: String, required: true },
}, { collection: 'leads', timestamps: true });

export const Lead: Model<LeadDomainModel> = model('Lead', LeadSchema);
