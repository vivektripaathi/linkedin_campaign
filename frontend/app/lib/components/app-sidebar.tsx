"use client";

import * as React from "react";
import {
    Bot,
    ChevronsUpDown,
    SquareTerminal,
    Users,
    MessageSquareText,
    LogOut,
    Share2,
} from "lucide-react";
import { Separator } from "@components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Collapsible, CollapsibleTrigger } from "@components/ui/collapsible";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@components/ui/sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { PAGE_TITLES, ROUTES } from "~/routes";
import { useAuthContext } from "../providers/auth-provider";
import { getInitials } from "../utils";

const data = {
    navMain: [
        {
            title: PAGE_TITLES[ROUTES.CAMPAIGNS],
            url: ROUTES.CAMPAIGNS,
            icon: SquareTerminal,
        },
        {
            title: PAGE_TITLES[ROUTES.LEADS],
            url: ROUTES.LEADS,
            icon: Bot,
        },
        {
            title: PAGE_TITLES[ROUTES.ACCOUNTS],
            url: ROUTES.ACCOUNTS,
            icon: Users,
        },
        {
            title: PAGE_TITLES[ROUTES.CHATS],
            url: ROUTES.CHATS,
            icon: MessageSquareText,
        },
    ],
};

export function AppSidebar({ children }: { children: React.ReactNode }) {
    const { user, logout } = useAuthContext();
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <>
            <Sidebar collapsible="icon">
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:cursor-pointer"
                                    >
                                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                            <Share2 className="size-4" />
                                        </div>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">
                                                ReachFlow
                                            </span>
                                        </div>
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <Separator />
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarMenu className="">
                            {data.navMain.map((item) => (
                                <Collapsible
                                    key={item.title}
                                    asChild
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton
                                                tooltip={item.title}
                                                className={`cursor-pointer ${
                                                    location.pathname ===
                                                    item.url
                                                        ? "bg-sidebar-border text-sidebar-accent-foreground font-medium"
                                                        : ""
                                                }`}
                                                onClick={() => {
                                                    navigate(item.url);
                                                }}
                                            >
                                                {item.icon && <item.icon />}
                                                <span>{item.title}</span>
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:cursor-pointer"
                                    >
                                        <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage />
                                            <AvatarFallback className="rounded-lg">
                                                {getInitials(
                                                    user?.name as string
                                                )}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">
                                                {user?.name}
                                            </span>
                                            <span className="truncate text-xs">
                                                {user?.email}
                                            </span>
                                        </div>
                                        <ChevronsUpDown className="ml-auto size-4" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                    side="bottom"
                                    align="end"
                                    sideOffset={4}
                                >
                                    <DropdownMenuLabel className="p-0 font-normal">
                                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                            <Avatar className="h-8 w-8 rounded-lg">
                                                <AvatarImage />
                                                <AvatarFallback className="rounded-lg">
                                                    {getInitials(
                                                        user?.name as string
                                                    )}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="grid flex-1 text-left text-sm leading-tight">
                                                <span className="truncate font-semibold">
                                                    {user?.name}
                                                </span>
                                                <span className="truncate text-xs">
                                                    {user?.email}
                                                </span>
                                            </div>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem
                                            onClick={logout}
                                            className="hover:cursor-pointer"
                                        >
                                            <LogOut />
                                            Log out
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>
            {children}
        </>
    );
}
