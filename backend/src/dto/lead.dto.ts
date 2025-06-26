import { Expose } from 'class-transformer';
import { BaseDomainModel } from './base.dto.js';
import { IsDate, IsString, IsUUID } from 'class-validator';
import { UUIDTypes } from 'uuid';

export class LeadDomainModel extends BaseDomainModel {
    fullName!: string;
    location!: string;
    profilePic!: string;
    profileUrl!: string;
    companyName!: string;
    currentJobTitle!: string;
}

export class CreateLeadRequestDto implements Omit<LeadDomainModel, '_id' | 'createdAt' | 'updatedAt' | '__v' | 'deletedAt'> {
    @Expose()
    @IsString()
    fullName!: string;

    @Expose()
    @IsString()
    location!: string;

    @Expose()
    @IsString()
    profilePic!: string;

    @Expose()
    @IsString()
    profileUrl!: string;

    @Expose()
    @IsString()
    companyName!: string;

    @Expose()
    @IsString()
    currentJobTitle!: string;
}

export class LeadResponseDto extends CreateLeadRequestDto {
    @Expose()
    @IsUUID('4', { message: 'Invalid campaign ID. Must be a valid UUID v4.' })
    _id!: UUIDTypes;

    @Expose()
    @IsDate()
    createdAt!: Date;

    @Expose()
    @IsDate()
    updatedAt!: Date;
}
