import { Request, Response } from 'express';
import { successResponse } from '../utils/apiResponse.js';
import { AccountDao } from '../dao/account.dao.js';
import { validateAndParseDto } from '../utils/validateAndParseDto.js';
import {
    CreateAccountRequestDto,
    AccountDomainModel,
    AccountResponseDto,
    LinkAccountRequestDto,
} from '../dto/account.dto.js';
import { BadResponseException, InvalidRequestException, NotFoundException } from '../utils/exceptions.js';
import { UnipileService } from '../services/unipile.service.js';
import { ChatController } from './chat.controller.js';
import { MessageController } from './message.controller.js';
import { ParamStringIdRequestDto } from '../dto/base.dto.js';

export class AccountController {
    constructor(
        private readonly accountDao: AccountDao,
        private readonly unipileService: UnipileService,
        private readonly chatController: ChatController,
        private readonly MessageController: MessageController,
    ) { }


    private _prepareCreateAccountPayload(dto: CreateAccountRequestDto): AccountDomainModel {
        return {
            _id: dto.id,
            name: dto.name,
            username: dto.username,
            providerId: dto.providerId,
            publicIdentifier: dto.publicIdentifier,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        };
    }


    private async _createAccount(input: any): Promise<AccountResponseDto> {
        const [dto, errors] = await validateAndParseDto(CreateAccountRequestDto, input);
        if (errors.length) throw new InvalidRequestException(errors.join(', '));

        const createAccountPayload = this._prepareCreateAccountPayload(dto);
        const createdAccount = await this.accountDao.create(createAccountPayload);

        const [response, responseErrors] = await validateAndParseDto(AccountResponseDto, createdAccount);
        if (responseErrors.length) throw new BadResponseException(responseErrors.join(', '));

        return response;
    }


    async createAccount(req: Request, res: Response) {
        const response = await this._createAccount(req.body ?? {});
        return successResponse(res, response, 201);
    };


    async getAllAccounts(_: Request, res: Response) {
        const accounts = await this.accountDao.getAll();

        const validatedList: AccountResponseDto[] = [];
        for (const account of accounts) {
            const [validated, errors] = await validateAndParseDto(AccountResponseDto, account);
            if (errors.length) throw new BadResponseException(errors.join(', '));
            validatedList.push(validated);
        }
        return successResponse(res, validatedList, 200);
    };


    async LinkAccountAndOnboardUser(req: Request, res: Response) {
        // validate request
        const [linkRequest, errors] = await validateAndParseDto(LinkAccountRequestDto, req.body ?? {});
        if (errors.length) throw new InvalidRequestException(errors.join(', '));

        // link account
        const linkedAccount = await this.unipileService.connectLinkedin(
            linkRequest.sessionCookie, linkRequest.userAgent
        )

        //get linked account info
        const account = await this.unipileService.retrieveAccount(linkedAccount.account_id);

        //create account entry in db
        const createdAccount = await this._createAccount(account);

        //list all chats
        const chats = await this.unipileService.getAllChats();

        //create chat entries in db
        await this.chatController.createBulkChatsUseCase(chats);

        //list all messages
        const messages = await this.unipileService.getAllMessages();

        //create messages entries in db
        await this.MessageController.createBulkMessagesUseCase(messages);

        return successResponse(res, createdAccount, 201);
    }

    async deleteAccount(req: Request, res: Response) {
        const [deleteParams, errors] = await validateAndParseDto(ParamStringIdRequestDto, req.params);
        if (errors.length) throw new InvalidRequestException(errors.join(', '));

        const accountId = deleteParams.id;

        const account = await this.accountDao.getById(accountId);
        if (!account) throw new NotFoundException(`Account with id ${accountId} not found`);

        await this.unipileService.deleteAccount(accountId);
        await this.MessageController.getDao().deleteByAccountId(accountId);
        await this.chatController.getDao().deleteByAccountId(accountId);
        await this.accountDao.deleteByAccountId(accountId);

        return successResponse(res, undefined, 204);
    }
}
