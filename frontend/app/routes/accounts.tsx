import type { Route } from "./+types/accounts";
import LayoutWithSidebar from "@components/Layout/LayoutWithSidebar";
import { Accounts } from "./accounts/page";
import { useAuth } from "@lib/hooks/use-auth";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Accounts | ReachFlow | Vivek Tripathi" },
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
