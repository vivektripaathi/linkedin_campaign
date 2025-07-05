import type { Route } from "./+types/chats";
import LayoutWithSidebar from "@components/Layout/LayoutWithSidebar";
import Chats from "./chats/page";

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
    return (
        <LayoutWithSidebar>
            <Chats />
        </LayoutWithSidebar>
    );
}
