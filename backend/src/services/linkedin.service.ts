import axios from "axios"
import { LinkedInProfile } from "../dto/linkedin.dto.js"
import { AIService } from "./ai.service.js"
import { PhantomBusterService } from "./phantom-buster.service.js"
import {
    AlreadyRetrievedSearchResultsException,
    ErrorScrapingLeads
} from "../utils/exceptions.js"
import { LeadProfile } from "../dto/phantom-bustor.js"


export class LinkedInMessageService {
    private aiService: AIService
    private phantomBusterService: PhantomBusterService
    private readonly linkedInOutreachPromptTemplate = (profile: LinkedInProfile) => `You're an expert AI sales assistant writing personalized LinkedIn outreach messages for a B2B sales team.

Write a short and friendly message that:
- Greets the person by name.
- Acknowledges their current role and company.
- Shows relevance to their work (based on their job title or summary).
- Briefly introduces how our AI-powered outreach tool can help them get more meetings or close more deals.
- Ends with a soft call to connect or start a conversation.

Use this person's profile to tailor the message:
Name: ${profile.name}
Job Title: ${profile.job_title}
Company: ${profile.company}
Location: ${profile.location}
Summary: ${profile.summary}

Return only the message text, no formatting or labels.`

    constructor() {
        this.aiService = new AIService();
        this.phantomBusterService = new PhantomBusterService();
    }


    private _buildPrompt(profile: LinkedInProfile): string {
        return this.linkedInOutreachPromptTemplate(profile)
    }


    private async _extractProfiles(data: any[], numberOfProfiles: number = 20): Promise<LeadProfile[]> {
        return data
            .filter((item) =>
                item.fullName &&
                item.profileUrl &&
                item.jobTitle &&
                item.location &&
                item.profileImageUrl &&
                item.company
            )
            .slice(0, numberOfProfiles)
            .map((item) => ({
                fullName: item.fullName,
                profileUrl: item.profileUrl,
                currentJobTitle: item.jobTitle,
                location: item.location,
                profilePic: item.profileImageUrl,
                companyName: item.company
            }));
    }



    private async _parseContainerResultObject(resultObject: string): Promise<LeadProfile[]> {
        const parsed = JSON.parse(resultObject);
        if (!parsed) throw new AlreadyRetrievedSearchResultsException();
        return this._extractProfiles((parsed.jsonUrl
            ? (await axios.get(parsed.jsonUrl)).data
            : parsed
        ))
    }


    public async generatePersonalizedMessage(profile: LinkedInProfile): Promise<string> {
        const prompt = this._buildPrompt(profile)
        return await this.aiService.getTextResponse(prompt)
    }


    async scrapLeadProfiles(searchUrl: string): Promise<LeadProfile[]> {
        try {
            console.log(`Got request to scrap leads from: ${searchUrl}`);
            const containerId = (await this.phantomBusterService.launchAgent(searchUrl)).containerId;
            console.log(`Linkedin Search Export agent launched in a container with id: ${containerId}`);
            await this.phantomBusterService.waitForContainerFinish(containerId);
            console.log(`Lead Scrapping finished.`);
            const containerResult = await this.phantomBusterService.fetchContainerResult(containerId);
            console.log(`Received scrap result from container. Extracting lead profiles out of it...`);
            return this._parseContainerResultObject(containerResult.resultObject);
        } catch (error) {
            throw new ErrorScrapingLeads()
        }
    }
}
