import React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Tooltip } from "@components/tooltip";
import type { LeadViewInterface } from "@lib/types";
import { MoreHorizontal, MessageSquare, ExternalLink, UserRound } from "lucide-react";
import { Button } from "@components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@components/ui/avatar";
import { getInitials } from "~/lib/utils";

export const createLeadColumns = ({ generateLinkedInMessage }: { generateLinkedInMessage: (lead: LeadViewInterface) => void }): ColumnDef<LeadViewInterface>[] => [
    {
        accessorKey: "fullName",
        header: "Full Name",
        cell: ({ row }) => {
            const fullName = row.getValue("fullName") as string;
            const imageUrl = row.original.profilePic;

            return React.createElement(
                "div",
                { className: "flex items-center gap-3 min-w-[150px] max-w-full" },
                React.createElement(
                    Avatar,
                    null,
                    React.createElement(AvatarImage, {
                        src: imageUrl,
                        alt: fullName,
                    }),
                    React.createElement(
                        AvatarFallback,
                        null,
                        getInitials(fullName)
                    )
                ),
                React.createElement("span", { className: "font-medium" }, fullName)
            );
        },
    },
    {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) =>
            React.createElement(
                "div",
                { className: "max-w-[300px]" },
                React.createElement(Tooltip, {
                    title: "Location",
                    description: row.getValue("location") as string,
                    maxLength: 60,
                })
            ),
    },
    {
        accessorKey: "profileUrl",
        header: "Profile URL",
        cell: ({ row }) => {
            const profileUrl = row.getValue("profileUrl") as string;

            return React.createElement(
                "div",
                { className: "max-w-[300px] flex items-center gap-2" },
                React.createElement(
                    "a",
                    {
                        href: profileUrl,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "flex items-center gap-1",
                    },
                    profileUrl,
                    React.createElement(ExternalLink, { className: "w-4 h-4" })
                )
            );
        },
    },
    {
        accessorKey: "companyName",
        header: "Company Name",
        cell: ({ row }) => {
            const companyName = (row.getValue("companyName") as string) || "No company name";
            return React.createElement(
                "div",
                { className: "max-w-[300px]" },
                React.createElement(Tooltip, {
                    title: "Company Name",
                    description: companyName,
                    maxLength: 60,
                })
            );
        },
    },
    {
        accessorKey: "currentJobTitle",
        header: "Current Job Title",
        cell: ({ row }) => {
            const currentJobTitle = (row.getValue("currentJobTitle") as string) || "No current job title";
            return React.createElement(
                "div",
                { className: "max-w-[300px]" },
                React.createElement(Tooltip, {
                    title: "Current Job Title",
                    description: currentJobTitle,
                    maxLength: 60,
                })
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const lead = row.original;

            return React.createElement(
                DropdownMenu,
                null,
                React.createElement(
                    DropdownMenuTrigger,
                    { asChild: true },
                    React.createElement(
                        Button,
                        { variant: "ghost", className: "h-8 w-8 p-0 hover:bg-sidebar-border cursor-pointer" },
                        React.createElement("span", { className: "sr-only" }, "Open menu"),
                        React.createElement(MoreHorizontal, { className: "h-4 w-4" })
                    )
                ),
                React.createElement(
                    DropdownMenuContent,
                    { align: "end" },
                    React.createElement(
                        DropdownMenuItem,
                        {
                            onClick: () => generateLinkedInMessage(lead),
                        },
                        React.createElement(MessageSquare, { className: "mr-2 h-4 w-4" }),
                        "Generate Message"
                    ),
                )
            );
        },
    },
];
