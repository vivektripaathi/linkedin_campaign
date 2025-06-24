import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import { AiApiKeyMissingException } from "../utils/exceptions.js"

export class AIService {
    private model = google("models/gemini-2.0-flash-exp")

    async getTextResponse(prompt: string): Promise<string> {
        try {
            const { text } = await generateText({
                model: this.model,
                prompt,
            })

            return text.trim()
        } catch (error) {
            if (error instanceof Error) {
                if (error?.name === "AI_LoadAPIKeyError") {
                    throw new AiApiKeyMissingException()
                }
            }
            throw error
        }
    }
}
