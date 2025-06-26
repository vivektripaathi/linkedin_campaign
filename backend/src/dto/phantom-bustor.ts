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

export interface LinkedInProfileResponse {
    full_name: string;
    profile_url: string;
    current_job_title: string;
    location: string;
    profile_pic: string;
    company_name: string;
}


