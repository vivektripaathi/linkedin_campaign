import { Navigate } from "react-router-dom";
import type { Route } from "./+types/_index";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "ReachFlow | Vivek Tripathi" },
        {
            name: "Campaigns Management",
            content:
                "An solution to manage LinkedIn outreach campaigns and unify all LinkedIn messages across accounts — with AI-powered personalized messaging, web scraping, and real-time conversation updates.",
        },
    ];
}

export default function Root() {
    return <Navigate to="/campaigns" replace />;
}
