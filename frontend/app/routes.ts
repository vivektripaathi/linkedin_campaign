import { type RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

export enum ROUTES {
    CAMPAIGNS = "/campaigns",
    LEADS = "/leads",
    ACCOUNTS = "/accounts",
    CHATS = "/chats",
    AUTH = "/auth"
}

export const PAGE_TITLES: Record<ROUTES, string> = {
    [ROUTES.CAMPAIGNS]: "Campaigns",
    [ROUTES.LEADS]: "Leads",
    [ROUTES.ACCOUNTS]: "Accounts",
    [ROUTES.CHATS]: "Chats",
    [ROUTES.AUTH]: "Auth",
};

export const PROTECTED_ROUTES: ROUTES[] = [
    ROUTES.CAMPAIGNS,
    ROUTES.LEADS,
    ROUTES.ACCOUNTS,
    ROUTES.CHATS,
];

export default flatRoutes() satisfies RouteConfig;
