import { Expose } from 'class-transformer';
import { BaseDomainModel, ParamStringIdRequestDto } from './base.dto.js';
import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';

export class AttendeeDomainModel extends BaseDomainModel {
    accountId!: string;
    name!: string;
    providerId!: string;
    pictureUrl!: string | undefined;
    profileUrl!: string | undefined;
}

export class CreateAttendeeRequestDto implements Omit<AttendeeDomainModel, '_id' | 'createdAt' | 'updatedAt' | '__v' | 'deletedAt'> {
    @Expose()
    @IsString()
    id!: string;

    @Expose()
    @IsString()
    accountId!: string;

    @Expose()
    @IsString()
    name!: string;

    @Expose()
    @IsString()
    providerId!: string;

    @Expose()
    @IsString()
    @IsOptional()
    pictureUrl!: string;

    @Expose()
    @IsString()
    @IsOptional()
    profileUrl!: string;
}

export class AttendeeResponseDto extends CreateAttendeeRequestDto {
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
