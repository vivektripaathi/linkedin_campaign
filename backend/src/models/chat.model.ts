import { model, Model, Schema } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';
import { ChatDomainModel } from '../dto/chat.dto.js';

const ChatSchema = new Schema<ChatDomainModel>({
    _id: {
        type: String,
        default: uuidV4,
    },
    accountId: { type: String, required: true},
    attendeeProviderId: { 
        type: String, 
        required: true,
        index: true
    },
    deletedAt: { type: Date, default: null },
}, { collection: 'chats', timestamps: true });

export const Chat: Model<ChatDomainModel> = model('Chat', ChatSchema);
