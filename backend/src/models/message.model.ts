import { model, Model, Schema } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';
import { MessageDomainModel } from '../dto/message.dto.js';

const MessageSchema = new Schema<MessageDomainModel>({
    _id: {
        type: String,
        default: uuidV4,
    },
    chatId: {
        type: String,
        required: true,
        ref: 'Chat',
    },
    text: { type: String, required: true },
    timestamp: { type: String, required: true },
    senderProviderId: { type: String, required: true },
}, { collection: 'messages', timestamps: true });

export const Message: Model<MessageDomainModel> = model('Message', MessageSchema);
