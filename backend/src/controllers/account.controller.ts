import { Request, Response } from 'express';
import { successResponse } from '../utils/apiResponse.js';
import { AccountDao } from '../dao/account.dao.js';
import { validateAndParseDto } from '../utils/validateAndParseDto.js';
import {
    CreateAccountRequestDto,
    AccountDomainModel,
    AccountResponseDto,
} from '../dto/account.dto.js';
import { BadResponseException, InvalidRequestException, NotFoundException } from '../utils/exceptions.js';

export class AccountController {
    constructor(private readonly accountDao: AccountDao) { }


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


    async createAccount(req: Request, res: Response) {
        //create account request validation
        const [createRequest, errors] = await validateAndParseDto(CreateAccountRequestDto, req.body ?? {});
        if (errors.length) throw new InvalidRequestException(errors.join(', '));

        //prepare domain model from create request and create account
        const createAccountPayload = this._prepareCreateAccountPayload(createRequest);
        const createdAccount = await this.accountDao.create(createAccountPayload);

        //validate and parse response and return response
        const [response, responseErrors] = await validateAndParseDto(AccountResponseDto, createdAccount);
        if (responseErrors.length) throw new BadResponseException(responseErrors.join(', '));
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
}
