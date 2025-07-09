import type { Route } from "./+types/chats";
import LayoutWithSidebar from "@components/Layout/LayoutWithSidebar";
import Chats from "./chats/page";
import { useAuth } from "@lib/hooks/use-auth";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Chats | CampaignPro | Vivek Tripathi" },
        {
            name: "Messenger",
            content: "Manage your LinkedIn chats — view, link, and unlink accounts easily.",
        },
    ];
}


export default function Campaign() {
    useAuth({ protectedRoute: true });

    return (
        <LayoutWithSidebar>
            <Chats />
        </LayoutWithSidebar>
    );
}
