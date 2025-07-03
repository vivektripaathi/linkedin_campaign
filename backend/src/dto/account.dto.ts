import { BaseDomainModel } from './base.dto.js';
import { IsDate, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class AccountDomainModel extends BaseDomainModel {
    name!: string;
    username!: string;
    providerId!: string;
    publicIdentifier!: string;
}


export class LinkAccountRequestDto {
    @Expose()
    @IsString()
    sessionCookie!: string;

    @Expose()
    @IsString()
    userAgent!: string;
}


export class CreateAccountRequestDto implements Omit<AccountDomainModel, '_id' | 'createdAt' | 'updatedAt' | '__v' | 'deletedAt'> {
    @Expose()
    @IsString()
    id!: string;

    @Expose()
    @IsString()
    name!: string;

    @Expose()
    @IsString()
    username!: string;

    @Expose()
    @IsString()
    providerId!: string;

    @Expose()
    @IsString()
    publicIdentifier!: string;
}


export class AccountResponseDto {
    @Expose()
    @IsString()
    _id!: string;

    @Expose()
    @IsString()
    name!: string;

    @Expose()
    @IsString()
    username!: string;

    @Expose()
    @IsString()
    providerId!: string;

    @Expose()
    @IsString()
    publicIdentifier!: string;

    @Expose()
    @IsDate()
    createdAt!: Date;

    @Expose()
    @IsDate()
    updatedAt!: Date;
}
