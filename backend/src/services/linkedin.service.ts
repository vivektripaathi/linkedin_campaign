import { LinkedInProfile } from "../dto/linkedin.dto.js"
import { AIService } from "./ai.service.js"


export class LinkedInMessageService {
    private aiService: AIService
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
        this.aiService = new AIService()
    }


    private _buildPrompt(profile: LinkedInProfile): string {
        return this.linkedInOutreachPromptTemplate(profile)
    }


    public async generatePersonalizedMessage(profile: LinkedInProfile): Promise<string> {
        const prompt = this._buildPrompt(profile)
        return await this.aiService.getTextResponse(prompt)
    }
}
