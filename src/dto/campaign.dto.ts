import { IsEnum, IsString, IsArray, ArrayNotEmpty, IsNumber, IsUUID, IsDate } from 'class-validator';
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
    @IsUUID()
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
