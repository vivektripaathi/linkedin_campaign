//core
export interface IBase {
    _id: string;
    createdAt: string,
    updatedAt: string,
}

export type ViewInterface<T> = Omit<T, "_id" | "createdAt" | "updatedAt"> & {
    id: string;
};

// Campaign Types
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


// Lead Types
export interface ILead {
    _id: string
    fullName: string
    location: string
    profilePic: string
    profileUrl: string
    companyName: string
    currentJobTitle: string
    createdAt: string
    updatedAt: string
}

export type LeadViewInterface = Omit<ILead, "_id" | "createdAt" | "updatedAt"> & {
    id: string;
};


// Accounts Types

export interface IAccount {
    _id: string,
    name: string,
    username: string,
    providerId: string,
    publicIdentifier: string,
    createdAt: string,
    updatedAt: string,
}

export type AccountViewInterface = Omit<IAccount, "_id" | "createdAt" | "updatedAt"> & {
    id: string;
};
