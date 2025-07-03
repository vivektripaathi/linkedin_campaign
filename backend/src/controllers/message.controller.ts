import { MessageDao } from "../dao/message.dao.js";
import { CreateMessageRequestDto, MessageDomainModel, MessageResponseDto } from "../dto/message.dto.js";
import { successResponse } from "../utils/apiResponse.js";
import { BadResponseException, InvalidRequestException } from "../utils/exceptions.js";
import { validateAndParseDto } from "../utils/validateAndParseDto.js";

export class MessageController {
    constructor(private readonly messageDao: MessageDao) { }


    private async _validateAndPrepareMessagePayloads(createMessagesRequest: any[]): Promise<MessageDomainModel[]> {
        const validMessages: MessageDomainModel[] = [];

        for (const [index, messageRequest] of createMessagesRequest.entries()) {
            const [messageDto, errors] = await validateAndParseDto(CreateMessageRequestDto, messageRequest);
            if (errors.length) {
                throw new InvalidRequestException(`Validation error in message at index ${index}: ${errors.join(', ')}`);
            }

            const domainMessage: MessageDomainModel = {
                _id: messageDto.id,
                text: messageDto.text,
                chatId: messageDto.chatId,
                timestamp: messageDto.timestamp,
                senderProviderId: messageDto.senderProviderId,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            };
            validMessages.push(domainMessage);
        }

        return validMessages;
    }


    private async _validateMessageResponses(createdMessages: MessageDomainModel[]): Promise<MessageResponseDto[]> {
        const validatedResponses: MessageResponseDto[] = [];

        for (const [index, message] of createdMessages.entries()) {
            const [validated, responseErrors] = await validateAndParseDto(MessageResponseDto, message);
            if (responseErrors.length) {
                throw new BadResponseException(`Response validation failed at index ${index}: ${responseErrors.join(', ')}`);
            }
            validatedResponses.push(validated);
        }

        return validatedResponses;
    }


    async bulkCreateMessages(req: Request, res: Response) {
        const createMessagesRequest = Array.isArray(req.body) ? req.body : [];
        if (!createMessagesRequest.length) {
            throw new InvalidRequestException('Request body must be a non-empty array of messages');
        }

        const validMessages = await this._validateAndPrepareMessagePayloads(createMessagesRequest);
        const createdMessages = await this.messageDao.bulkCreate(validMessages);
        const response = await this._validateMessageResponses(createdMessages);

        return successResponse(res, response, 201);
    }


    async getAllMessages(_: Request, res: Response) {
        const messageDbEntries = await this.messageDao.getAll();

        const messages: MessageResponseDto[] = [];
        for (const message of messageDbEntries) {
            const [validated, errors] = await validateAndParseDto(MessageResponseDto, message);
            if (errors.length) throw new BadResponseException(errors.join(', '));
            messages.push(validated);
        }

        return successResponse(res, messages, 200);
    };
}
