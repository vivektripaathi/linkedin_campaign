export enum CampaignStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
}

export interface ICampaign {
    id: string
    name: string
    description: string
    status: CampaignStatus
    leads: string[]
    accountIDs: string[]
    createdAt: string
    updatedAt: string
}

export interface CampaignViewInterface {
    id: string
    name: string
    description: string
    status: CampaignStatus
    leads: string[]
    accountIDs: string[]
}
