import type { Route } from "./+types/home";
import { Campaigns } from "./campaigns/page";
import LayoutWithSidebar from "@components/Layout/LayoutWithSidebar";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "CampaignPro | Vivek Tripathi" },
        {
            name: "Campaigns Management",
            content:
                "A service for managing LinkedIn outreach campaigns with AI-powered personalized messaging.",
        },
    ];
}

export default function Home() {
    return (
        <LayoutWithSidebar>
            <Campaigns />
        </LayoutWithSidebar>
    );
}
