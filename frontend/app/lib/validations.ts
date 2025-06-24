import { z } from "zod"
import { CampaignStatus } from "@lib/types"

export const campaignSchema = z.object({
    name: z.string().min(1, "Campaign name is required").max(100, "Name must be less than 100 characters"),
    description: z.string().min(1, "Description is required").max(500, "Description must be less than 500 characters"),
    status: z.nativeEnum(CampaignStatus),
    leads: z.array(z.string().min(1, "Lead is required")).min(1, "At least one lead is required"),
    accountIDs: z.array(z.string().min(1, "Account ID cannot be empty")).min(1, "At least one account ID is required"),
})

export type CampaignFormData = z.infer<typeof campaignSchema>
