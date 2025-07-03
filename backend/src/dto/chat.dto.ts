import { Expose } from 'class-transformer';
import { BaseDomainModel } from './base.dto.js';
import { IsDate, IsString, IsUUID } from 'class-validator';
import { UUIDTypes } from 'uuid';

export class ChatDomainModel extends BaseDomainModel {
    accountId!: string;
    attendeeName!: string;
    attendeeProviderId!: string;
    attendeePictureUrl!: string;
}

export class CreateChatRequestDto implements Omit<ChatDomainModel, '_id' | 'createdAt' | 'updatedAt' | '__v' | 'deletedAt'> {
    @Expose()
    @IsString()
    id!: string;

    @Expose()
    @IsString()
    accountId!: string;

    @Expose()
    @IsString()
    attendeeName!: string;

    @Expose()
    @IsString()
    attendeeProviderId!: string;

    @Expose()
    @IsString()
    attendeePictureUrl!: string;
}

export class ChatResponseDto extends CreateChatRequestDto {
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
