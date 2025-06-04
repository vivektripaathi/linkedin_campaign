import { IsEnum, IsString, IsArray, ArrayNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';
import { BaseDomainModel } from './base.dto.js';

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
