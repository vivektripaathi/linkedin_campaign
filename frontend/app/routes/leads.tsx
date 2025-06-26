import type { Route } from "./+types/leads";
import { Leads } from "./leads/page";
import LayoutWithSidebar from "@components/Layout/LayoutWithSidebar";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Leads | CampaignPro | Vivek Tripathi" },
        {
            name: "Leads Dashboard",
            content:
                "View leads and generate personalized outreach messages for leads",
        },
    ];
}

export default function Campaign() {
    return (
        <LayoutWithSidebar>
            <Leads />
        </LayoutWithSidebar>
    );
}
