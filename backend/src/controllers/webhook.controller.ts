import { Request, Response } from 'express';
import { successResponse } from '../utils/apiResponse.js';
import { validateAndParseDto } from '../utils/validateAndParseDto.js';
import { NewMessageWebhookRequestDto } from '../dto/webhook.dto.js';
import { InvalidRequestException, NotFoundException } from '../utils/exceptions.js';
import { ChatController } from './chat.controller.js';
import { MessageController } from './message.controller.js';
import { CreateMessageRequestDto } from '../dto/message.dto.js';
import { CreateChatRequestDto } from '../dto/chat.dto.js';
import { io } from '../utils/socket.js';

export class WebhookController {

    constructor(
        private readonly chatController: ChatController,
        private readonly messageController: MessageController,
    ) { }

    private _prepareCreateMessageRequest(
        newMessageRequest: NewMessageWebhookRequestDto
    ): CreateMessageRequestDto {
        return {
            id: newMessageRequest.message_id,
            accountId: newMessageRequest.account_id,
            text: newMessageRequest.message,
            chatId: newMessageRequest.chat_id,
            timestamp: newMessageRequest.timestamp,
            // TODO: get chat_attendee by id to get profile pic url
            senderProviderId: newMessageRequest.sender.attendee_provider_id
        }
    }

    private _prepareCreateChatRequest(
        newMessageRequest: NewMessageWebhookRequestDto
    ): CreateChatRequestDto {
        return {
            id: newMessageRequest.chat_id,
            accountId: newMessageRequest.account_id,
            attendeeName: newMessageRequest.attendees[0].attendee_name,
            attendeeProviderId: newMessageRequest.attendees[0].attendee_provider_id,
            attendeePictureUrl: newMessageRequest.attendees[0].attendee_profile_url,
        }
    };

    async onNewMessage(req: Request, res: Response) {
        const [newMessageRequest, errors] = await validateAndParseDto(NewMessageWebhookRequestDto, req.body ?? {});
        if (errors.length) throw new InvalidRequestException(errors.join(', '));

        try {
            await this.chatController.getChatByIdUseCase(newMessageRequest.chat_id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                this.chatController.createMessageUseCase(
                    this._prepareCreateChatRequest(newMessageRequest)
                )
            } else {
                console.log(error);
            }
        }

        const createMessageRequest = this._prepareCreateMessageRequest(newMessageRequest);

        const createdMessage = await this.messageController.createMessageUseCase(
            createMessageRequest
        );

        io.to("web_socket_key").emit("new_message", {
            chat: {
                id: newMessageRequest.chat_id,
                accountId: newMessageRequest.account_id,
                attendeeName: newMessageRequest.attendees[0].attendee_name,
                attendeeProviderId: newMessageRequest.attendees[0].attendee_provider_id,
                attendeePictureUrl: newMessageRequest.attendees[0].attendee_profile_url,
            },
            message: {
                id: createdMessage.id,
                accountId: createdMessage.accountId,
                chatId: createdMessage.chatId,
                text: createdMessage.text,
                timestamp: createdMessage.timestamp,
                senderProviderId: createdMessage.senderProviderId,
            }
        });

        return successResponse(res, 200);
    }
}
