import { Request, Response } from "express";
import { ChatDao } from "../dao/chat.dao.js";
import { ParamStringIdRequestDto } from "../dto/base.dto.js";
import { ChatDomainModel, ChatResponseDto, CreateChatRequestDto, SendMessageRequestDto } from "../dto/chat.dto.js";
import { successResponse } from "../utils/apiResponse.js";
import { BadResponseException, InvalidRequestException, NotFoundException } from "../utils/exceptions.js";
import { validateAndParseDto } from "../utils/validateAndParseDto.js";
import { UnipileService } from "../services/unipile.service.js";
import { IAttendee, IChat } from "../utils/types/unipile.js";

export class ChatController {
    constructor(
        private readonly chatDao: ChatDao,
        private readonly unipileService: UnipileService
    ) { }


    private async _validateAndPrepareChatPayloads(createChatsRequest: any[]): Promise<ChatDomainModel[]> {
        const validChats: ChatDomainModel[] = [];

        for (const [index, chatRequest] of createChatsRequest.entries()) {
            if (chatRequest.attendeeProviderId) {
                const [chatDto, errors] = await validateAndParseDto(CreateChatRequestDto, chatRequest);
                if (errors.length) {
                    throw new InvalidRequestException(`Validation error in chat at index ${index}: ${errors.join(', ')}`);
                }

                const domainChat: ChatDomainModel = {
                    _id: chatDto.id,
                    accountId: chatDto.accountId,
                    attendeeProviderId: chatDto.attendeeProviderId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null,
                };
                validChats.push(domainChat);
            }
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


    public async createBulkChatsUseCase(createChatsRequest: any[]): Promise<ChatResponseDto[]> {
        const validChats = await this._validateAndPrepareChatPayloads(createChatsRequest);
        const createdChats = await this.chatDao.bulkCreate(validChats);
        return await this._validateChatResponses(createdChats);
    }


    async bulkCreateChats(req: Request, res: Response) {
        const createChatsRequest = Array.isArray(req.body) ? req.body : [];
        if (!createChatsRequest.length) {
            throw new InvalidRequestException('Request body must be a non-empty array of chats');
        }

        const response = this.createBulkChatsUseCase(createChatsRequest)

        return successResponse(res, response, 201);
    }


    private _convertChatsToDomainModel(chats: IChat[]): ChatDomainModel[] {
        return chats.map(unipileChat => {
            const chatDbEntry = new ChatDomainModel();
            chatDbEntry._id = unipileChat.id;
            chatDbEntry.accountId = unipileChat.accountId;
            chatDbEntry.attendeeProviderId = unipileChat.attendeeProviderId;
            chatDbEntry.createdAt = new Date();
            chatDbEntry.updatedAt = new Date();
            chatDbEntry.deletedAt = null;
            return chatDbEntry;
        });
    }


    private _mergeChatsWithAttendees(chats: Array<ChatDomainModel>, attendees: Array<IAttendee>): Array<ChatDomainModel> {
        return chats.map(chat => {
            const attendee = attendees.find(attendee => attendee.providerId === chat.attendeeProviderId);
            return {
                _id: chat._id,
                id: chat._id,
                accountId: chat.accountId,
                attendeeProviderId: chat.attendeeProviderId,
                createdAt: chat.createdAt,
                updatedAt: chat.updatedAt,
                deletedAt: chat.deletedAt,
                attendee: {
                    id: attendee?.id || '',
                    name: attendee?.name || 'N/A',
                    accountId: attendee?.accountId || '',
                    providerId: chat.attendeeProviderId,
                    pictureUrl: attendee?.pictureUrl || undefined,
                    profileUrl: attendee?.profileUrl || undefined
                }
            };
        });
    }


    async getAllChats(_: Request, res: Response) {
        let [chatDbEntries, chat] = await Promise.all([
            this.chatDao.getAll(),
            this.unipileService.getAllChats()
        ]);

        const dbChatIds = new Set(chatDbEntries.map(entry => entry._id));
        const chatsNotInDb = chat.filter(unipileChat => !dbChatIds.has(unipileChat.id));

        await this.createBulkChatsUseCase(chatsNotInDb);

        chatDbEntries = await this.chatDao.getAll();

        const attendees = await this.unipileService.getAllAttendees();
        chatDbEntries = this._mergeChatsWithAttendees(chatDbEntries, attendees);

        const chats: ChatResponseDto[] = [];
        for (const chat of chatDbEntries) {
            const [validated, errors] = await validateAndParseDto(ChatResponseDto, chat);
            if (errors.length) throw new BadResponseException(errors.join(', '));
            chats.push(validated);
        }

        return successResponse(res, chats, 200);
    };

    async getChatByIdUseCase(chatId: string) {
        const chat = await this.chatDao.getById(chatId);
        if (!chat) throw new NotFoundException(`Campaign with id ${chatId} not found`);

        const [response, responseErrors] = await validateAndParseDto(ChatResponseDto, chat);
        if (responseErrors.length) throw new BadResponseException(responseErrors.join(', '));

        return response;
    }

    async getChatById(req: Request, res: Response) {
        const [getRequest, errors] = await validateAndParseDto(ParamStringIdRequestDto, req.params);
        if (errors.length) throw new InvalidRequestException(errors.join(', '));

        return successResponse(res, await this.getChatByIdUseCase(getRequest.id), 200);
    }

    private _prepareChatDomainModel(dto: CreateChatRequestDto): ChatDomainModel {
        return {
            _id: dto.id,
            accountId: dto.accountId,
            attendeeProviderId: dto.attendeeProviderId,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        }
    }

    async createMessageUseCase(
        createMessageRequest: CreateChatRequestDto
    ): Promise<ChatResponseDto> {
        const createdChat = await this.chatDao.create(
            this._prepareChatDomainModel(createMessageRequest)
        );

        const [response, responseErrors] = await validateAndParseDto(ChatResponseDto, createdChat);
        if (responseErrors.length) throw new BadResponseException(responseErrors.join(', '));
        return response;
    }

    async sendMessage(req: Request, res: Response) {
        const [messageRequest, errors] = await validateAndParseDto(SendMessageRequestDto, {
            ...req.body,
            ...req.params,
        });
        if (errors.length) throw new InvalidRequestException(errors.join(', '));

        await this.unipileService.sendMessageInChat({
            chatId: messageRequest.id,
            text: messageRequest.text,
        })
        return successResponse(res, 200);
    }

    public getDao() {
        return this.chatDao;
    }
}
