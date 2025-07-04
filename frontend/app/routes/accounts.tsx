import type { Route } from "./+types/accounts";
import LayoutWithSidebar from "@components/Layout/LayoutWithSidebar";
import { Accounts } from "./accounts/page";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Accounts | CampaignPro | Vivek Tripathi" },
        {
            name: "Accounts Dashboard",
            content: "view, link and unlink LinkedIn accounts.",
        },
    ];
}

export default function Campaign() {
    return (
        <LayoutWithSidebar>
            <Accounts />
        </LayoutWithSidebar>
    );
}
