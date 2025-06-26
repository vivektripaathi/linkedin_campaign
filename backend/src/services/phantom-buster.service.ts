import axios from 'axios';
import {
    AgentLaunchResponse,
    ContainerFetchResponse,
    ContainerResultObjectResponse,
    ContainerStatusEnum,
} from '../dto/phantom-bustor.js';


export class PhantomBusterService {
    async launchAgent(searchUrl: string): Promise<AgentLaunchResponse> {
        const response = await axios.post<AgentLaunchResponse>(
            `${process.env.PHANTOM_BUSTER_API_BASE_URL}/agents/launch`,
            {
                id: process.env.PHANTOM_BUSTER_LINKEDIN_SEARCH_EXPORT_AGENT_ID,
                arguments: {
                    search: searchUrl,
                    sessionCookie: process.env.LINKEDIN_SESSION_COOKIE
                }
            },
            {
                headers: {
                    'content-type': 'application/json',
                    'X-Phantombuster-Key': process.env.PHANTOM_BUSTER_API_KEY
                }
            }
        );

        return response.data;
    }


    async fetchContainer(containerId: string): Promise<ContainerFetchResponse> {
        const response = await axios.get<ContainerFetchResponse>(
            `${process.env.PHANTOM_BUSTER_API_BASE_URL}/containers/fetch?id=${containerId}`,
            {
                headers: {
                    accept: 'application/json',
                    'X-Phantombuster-Key': process.env.PHANTOM_BUSTER_API_KEY
                }
            }
        );

        return response.data;
    }


    async waitForContainerFinish(containerId: string): Promise<void> {
        let status = ContainerStatusEnum.RUNNING;
        while (status === ContainerStatusEnum.RUNNING) {
            const containerResponse = await this.fetchContainer(containerId);
            status = containerResponse.status;
            if (status === ContainerStatusEnum.RUNNING) await new Promise((r) => setTimeout(r, 2000));
        }
    }


    async fetchContainerResult(containerId: string): Promise<ContainerResultObjectResponse> {
        const res = await axios.get<ContainerResultObjectResponse>(
            `${process.env.PHANTOM_BUSTER_API_BASE_URL}/containers/fetch-result-object?id=${containerId}`,
            {
                headers: {
                    accept: 'application/json',
                    'X-Phantombuster-Key': process.env.PHANTOM_BUSTER_API_KEY
                }
            }
        );

        return res.data;
    }
}
