import { model, Model, Schema } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';
import { ChatDomainModel } from '../dto/chat.dto.js';

const ChatSchema = new Schema<ChatDomainModel>({
    _id: {
        type: String,
        default: uuidV4,
    },
    accountId: { type: String, required: true },
    attendeeName: { type: String, required: true },
    attendeeProviderId: { type: String, required: true },
    attendeePictureUrl: { type: String, required: true },
}, { collection: 'chats', timestamps: true });

export const Chat: Model<ChatDomainModel> = model('Chat', ChatSchema);
