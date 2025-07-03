import { ChatDao } from "../dao/chat.dao.js";
import { ChatDomainModel, ChatResponseDto, CreateChatRequestDto } from "../dto/chat.dto.js";
import { successResponse } from "../utils/apiResponse.js";
import { BadResponseException, InvalidRequestException } from "../utils/exceptions.js";
import { validateAndParseDto } from "../utils/validateAndParseDto.js";

export class ChatController {
    constructor(private readonly chatDao: ChatDao) { }


    private async _validateAndPrepareChatPayloads(createChatsRequest: any[]): Promise<ChatDomainModel[]> {
        const validChats: ChatDomainModel[] = [];

        for (const [index, chatRequest] of createChatsRequest.entries()) {
            const [chatDto, errors] = await validateAndParseDto(CreateChatRequestDto, chatRequest);
            if (errors.length) {
                throw new InvalidRequestException(`Validation error in chat at index ${index}: ${errors.join(', ')}`);
            }

            const domainChat: ChatDomainModel = {
                _id: chatDto.id,
                accountId: chatDto.accountId,
                attendeeName: chatDto.attendeeName,
                attendeeProviderId: chatDto.attendeeProviderId,
                attendeePictureUrl: chatDto.attendeePictureUrl,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            };
            validChats.push(domainChat);
        }

        return validChats;
    }


    private async _validateChatResponses(createdChats: ChatDomainModel[]): Promise<ChatResponseDto[]> {
        const validatedResponses: ChatResponseDto[] = [];

        for (const [index, chat] of createdChats.entries()) {
            const [validated, responseErrors] = await validateAndParseDto(ChatResponseDto, chat);
            if (responseErrors.length) {
                throw new BadResponseException(`Response validation failed at index ${index}: ${responseErrors.join(', ')}`);
            }
            validatedResponses.push(validated);
        }

        return validatedResponses;
    }


    async bulkCreateChats(req: Request, res: Response) {
        const createChatsRequest = Array.isArray(req.body) ? req.body : [];
        if (!createChatsRequest.length) {
            throw new InvalidRequestException('Request body must be a non-empty array of chats');
        }

        const validChats = await this._validateAndPrepareChatPayloads(createChatsRequest);
        const createdChats = await this.chatDao.bulkCreate(validChats);
        const response = await this._validateChatResponses(createdChats);

        return successResponse(res, response, 201);
    }



    async getAllChats(_: Request, res: Response) {
        const chatDbEntries = await this.chatDao.getAll();

        const chats: ChatResponseDto[] = [];
        for (const chat of chatDbEntries) {
            const [validated, errors] = await validateAndParseDto(ChatResponseDto, chat);
            if (errors.length) throw new BadResponseException(errors.join(', '));
            chats.push(validated);
        }

        return successResponse(res, chats, 200);
    };
}
