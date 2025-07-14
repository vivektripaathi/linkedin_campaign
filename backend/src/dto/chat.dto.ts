import { Expose, Type } from 'class-transformer';
import { BaseDomainModel, ParamStringIdRequestDto } from './base.dto.js';
import { IsDate, IsOptional, IsString, ValidateNested } from 'class-validator';

export class AttendeeDomainModel {
    @Expose()
    @IsString()
    id!: string;

    @Expose()
    @IsString()
    name!: string;

    @Expose()
    @IsString()
    providerId!: string;

    @Expose()
    @IsOptional()
    @IsString()
    pictureUrl?: string;

    @Expose()
    @IsOptional()
    @IsString()
    profileUrl?: string;
}

export class ChatDomainModel extends BaseDomainModel {
    accountId!: string;
    attendeeProviderId!: string;
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
    attendeeProviderId!: string;

    @Expose()
    @ValidateNested()
    @Type(() => AttendeeDomainModel)
    @IsOptional()
    attendee?: AttendeeDomainModel;
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

export class SendMessageRequestDto extends ParamStringIdRequestDto {
    @Expose()
    @IsString()
    text!: string;
}
