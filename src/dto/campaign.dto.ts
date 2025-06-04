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

export class CreateCampaignRequestDto implements Omit<CampaignDomainModel, '_id' | 'createdAt' | 'updatedAt' | '__v'> {
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

export class CampaignResponseDto extends CreateCampaignRequestDto {
    @Expose()
    @IsUUID('4', { message: 'Invalid campaign ID. Must be a valid UUID v4.' })
    _id!: UUIDTypes;

    @Expose()
    @IsDate()
    createdAt!: string;

    @Expose()
    @IsDate()
    updatedAt!: string;

    @Expose()
    @IsNumber()
    __v!: number;
}


export class UpdateCampaignRequestDto implements Omit<CampaignDomainModel, '_id' | 'createdAt' | 'updatedAt' | '__v'> {
    @Expose()
    @IsString()
    @IsOptional()
    name!: string;

    @Expose()
    @IsString()
    @IsOptional()
    description!: string;

    @Expose()
    @IsEnum(campaignStatusEnum)
    @IsOptional()
    status!: campaignStatusEnum;

    @Expose()
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    @IsOptional()
    leads!: string[];

    @Expose()
    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    accountIDs!: string[];
}