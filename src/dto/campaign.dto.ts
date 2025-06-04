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
