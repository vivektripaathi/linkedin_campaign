import { useAuth } from "~/lib/hooks/use-auth";
import type { Route } from "./+types/campaigns";
import { Campaigns } from "./campaigns/page";
import LayoutWithSidebar from "@components/Layout/LayoutWithSidebar";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Campaign | ReachFlow | Vivek Tripathi" },
        {
            name: "Campaigns Dashboard",
            content: "View, edit and create campaigns.",
        },
    ];
}

export default function Campaign() {
    return (
        <LayoutWithSidebar>
            <Campaigns />
        </LayoutWithSidebar>
    );
}
