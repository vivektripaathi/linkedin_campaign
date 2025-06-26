import { LeadDomainModel } from "./lead.dto.js";

export interface AgentLaunchResponse {
    containerId: string;
}

export enum ContainerStatusEnum {
    RUNNING = 'running',
    FINISHED = 'finished'
}

export interface ContainerFetchResponse {
    id: string;
    status: ContainerStatusEnum;
    createdAt: number;
    launchedAt: number;
    retryNumber: number;
    endedAt?: number;
    launchType?: string;
    exitCode?: number;
    endType?: string;
}

export interface ContainerResultObjectResponse {
    resultObject: string;
}

export type LeadProfile = Omit<LeadDomainModel, '_id' | 'createdAt' | 'updatedAt' | '__v' | 'deletedAt'>
