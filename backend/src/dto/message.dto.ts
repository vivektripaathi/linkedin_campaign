import { Expose } from 'class-transformer';
import { BaseDomainModel } from './base.dto.js';
import { IsDate, IsString, IsUUID } from 'class-validator';
import { UUIDTypes } from 'uuid';

export class MessageDomainModel extends BaseDomainModel {
    text!: string;
    chatId!: string;
    timestamp!: Date;
    senderProviderId!: string;
}

export class CreateMessageRequestDto implements Omit<MessageDomainModel, '_id' | 'createdAt' | 'updatedAt' | '__v' | 'deletedAt'> {
    @Expose()
    @IsString()
    id!: string;

    @Expose()
    @IsString()
    text!: string;

    @Expose()
    @IsString()
    chatId!: string;

    @Expose()
    @IsDate()
    timestamp!: Date;

    @Expose()
    @IsString()
    senderProviderId!: string;
}

export class MessageResponseDto extends CreateMessageRequestDto {
    @Expose()
    @IsString()
    _id!: string;

    @Expose()
    @IsDate()
    createdAt!: Date;

    @Expose()
    @IsDate()
    updatedAt!: Date;
}
