export enum CampaignStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
}

export interface ICampaign {
    _id: string
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

export interface LinkedInProfile {
    name: string
    job_title: string
    company: string
    location: string
    summary: string
}

export interface CreateCampaignData {
    name: string
    description: string
    status: CampaignStatus
    leads: string[]
    accountIds: string[]
}
