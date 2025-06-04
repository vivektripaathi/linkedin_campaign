import { IsEnum, IsString, IsArray, ArrayNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export enum campaignStatusEnum {
    ACTIVE = "active",
    INACTIVE = "inactive",
}

export class CampaignDomainModel {
    _id!: string;
    name!: string;
    description!: string;
    status!: campaignStatusEnum;
    leads!: string[];
    accountIDs!: string[];
    createdAt!: string;
    updatedAt!: string;
    __v!: number;
}

export class  CreateCampaignRequestDto implements Omit<CampaignDomainModel, '_id' | 'createdAt' | 'updatedAt' | '__v'>{
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
