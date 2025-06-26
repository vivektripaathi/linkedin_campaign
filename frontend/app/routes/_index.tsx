import { Navigate } from "react-router-dom";
import type { Route } from "./+types/_index";

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

export default function Root() {
    return <Navigate to="/campaigns" replace />;
}
