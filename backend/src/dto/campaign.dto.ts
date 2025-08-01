import { IsEnum, IsString, IsArray, ArrayNotEmpty, IsNumber, IsUUID, IsDate, IsOptional } from 'class-validator';
import { Expose } from 'class-transformer';
import { BaseDomainModel } from './base.dto.js';
import { UUIDTypes } from 'uuid';

export enum campaignStatusEnum {
    ACTIVE = "active",
    INACTIVE = "inactive",
}

export class CampaignDomainModel extends BaseDomainModel {
    name!: string;
    description!: string;
    status!: campaignStatusEnum;
    leads!: string[];
    accountIDs!: string[];
}

export class CreateOrUpdateCampaignRequestDto implements Omit<CampaignDomainModel, '_id' | 'createdAt' | 'updatedAt' | '__v' | 'deletedAt'> {
    @Expose()
    @IsString()
    name!: string;

    @Expose()
    @IsString()
    description!: string;

    @Expose()
    @IsEnum(campaignStatusEnum)
    status!: campaignStatusEnum;

    @Expose()
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    leads!: string[];

    @Expose()
    @IsArray()
    @IsString({ each: true })
    accountIDs!: string[];
}


export class CampaignResponseDto extends CreateOrUpdateCampaignRequestDto {
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

