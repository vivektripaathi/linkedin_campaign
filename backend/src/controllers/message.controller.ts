import { MessageDao } from "../dao/message.dao.js";
import { CreateMessageRequestDto, MessageDomainModel, MessageResponseDto } from "../dto/message.dto.js";
import { successResponse } from "../utils/apiResponse.js";
import { BadResponseException, InvalidRequestException } from "../utils/exceptions.js";
import { validateAndParseDto } from "../utils/validateAndParseDto.js";

export class MessageController {
    constructor(private readonly messageDao: MessageDao) { }


    private _prepareMessageDomainModel(dto: CreateMessageRequestDto): MessageDomainModel {
        return {
            _id: dto.id,
            text: dto.text || "Message Deleted",
            chatId: dto.chatId,
            timestamp: dto.timestamp,
            accountId: dto.accountId,
            senderProviderId: dto.senderProviderId,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        };
    }


    private async _validateAndPrepareMessagePayloads(createMessagesRequest: any[]): Promise<MessageDomainModel[]> {
        const validMessages: MessageDomainModel[] = [];

        for (const [index, messageRequest] of createMessagesRequest.entries()) {
            const [messageDto, errors] = await validateAndParseDto(CreateMessageRequestDto, messageRequest);
            if (errors.length) {
                throw new InvalidRequestException(`Validation error in message at index ${index}: ${errors.join(', ')}`);
            }

            const domainMessage: MessageDomainModel = {
                _id: messageDto.id,
                text: messageDto.text || "Message Deleted",
                chatId: messageDto.chatId,
                timestamp: messageDto.timestamp,
                accountId: messageDto.accountId,
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


    public async createBulkMessagesUseCase(createMessagesRequest: any[]): Promise<MessageResponseDto[]> {
        const validMessages = await this._validateAndPrepareMessagePayloads(createMessagesRequest);
        const createdMessages = await this.messageDao.bulkCreate(validMessages);
        return await this._validateMessageResponses(createdMessages);
    }


    async bulkCreateMessages(req: Request, res: Response) {
        const createMessagesRequest = Array.isArray(req.body) ? req.body : [];
        if (!createMessagesRequest.length) {
            throw new InvalidRequestException('Request body must be a non-empty array of messages');
        }

        const response = await this.createBulkMessagesUseCase(createMessagesRequest)

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


    async createMessageUseCase(
        createMessageRequest: CreateMessageRequestDto
    ): Promise<MessageResponseDto> {
        const createdMessage = await this.messageDao.create(
            this._prepareMessageDomainModel(createMessageRequest)
        );

        const [response, responseErrors] = await validateAndParseDto(MessageResponseDto, createdMessage);
        if (responseErrors.length) throw new BadResponseException(responseErrors.join(', '));
        return response;
    }

    public getDao() {
        return this.messageDao;
    }
}
