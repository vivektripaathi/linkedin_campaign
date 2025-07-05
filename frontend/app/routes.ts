import { type RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

export enum ROUTES {
    CAMPAIGNS = "/campaigns",
    LEADS = "/leads",
    ACCOUNTS = "/accounts",
    CHATS = "/chats"
}

export const PAGE_TITLES: Record<ROUTES, string> = {
    [ROUTES.CAMPAIGNS]: "Campaigns",
    [ROUTES.LEADS]: "Leads",
    [ROUTES.ACCOUNTS]: "Accounts",
    [ROUTES.CHATS]: "Chats"
};

export default flatRoutes() satisfies RouteConfig;
