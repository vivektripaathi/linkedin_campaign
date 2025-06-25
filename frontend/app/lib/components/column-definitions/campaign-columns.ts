import React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash2, Edit } from "lucide-react";
import { Button } from "@components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";

import { StatusToggle } from "@components/status-toggle";
import { Tooltip } from "~/lib/components/tooltip";
import type { CampaignStatus, CampaignViewInterface } from "@lib/types";

interface CampaignColumnsOptions {
    onEdit: (campaign: CampaignViewInterface) => void;
    onDelete: (campaigns: CampaignViewInterface) => void;
    onStatusChange: (campaign: CampaignViewInterface, status: CampaignStatus) => void;
}

export const createCampaignColumns = ({
    onEdit,
    onDelete,
    onStatusChange,
}: CampaignColumnsOptions): ColumnDef<CampaignViewInterface>[] => [
        {
            id: "select",
            enableSorting: false,
            enableHiding: true,
        },
        {
            accessorKey: "name",
            header: "Campaign Name",
            cell: ({ row }) =>
                React.createElement(
                    "div",
                    { className: "w-100px" },
                    row.getValue("name") as string
                ),
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) =>
                React.createElement(
                    "div",
                    { className: "max-w-[300px]" },
                    React.createElement(Tooltip, {
                        title: "Description",
                        description: row.getValue("description") as string,
                        maxLength: 60,
                    })
                ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const campaign = row.original;
                return React.createElement(StatusToggle, {
                    status: campaign.status,
                    onStatusChange: (newStatus) =>
                        onStatusChange(campaign, newStatus),
                });
            },
        },
        {
            accessorKey: "leads",
            header: "Leads",
            cell: ({ row }) => {
                const leads = (row.getValue("leads") as string[])?.join(", ") || "No leads";
                return React.createElement(
                    "div",
                    { className: "max-w-[300px]" },
                    React.createElement(Tooltip, {
                        title: "Leads",
                        description: leads,
                        maxLength: 60,
                    })
                );
            },
        },
        {
            accessorKey: "accountIDs",
            header: "Accounts",
            cell: ({ row }) => {
                const accounts = (row.getValue("accountIDs") as string[])?.join(", ") || "No accounts";
                return React.createElement(
                    "div",
                    { className: "max-w-[300px]" },
                    React.createElement(Tooltip, {
                        title: "Accounts",
                        description: accounts,
                        maxLength: 60,
                    })
                );
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const campaign = row.original;

                return React.createElement(
                    DropdownMenu,
                    null,
                    React.createElement(
                        DropdownMenuTrigger,
                        { asChild: true },
                        React.createElement(
                            Button,
                            { variant: "ghost", className: "h-8 w-8 p-0" },
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
                                onClick: () => onEdit(campaign),
                            },
                            React.createElement(Edit, { className: "mr-2 h-4 w-4" }),
                            "Edit Campaign"
                        ),
                        React.createElement(
                            DropdownMenuItem,
                            {
                                onClick: () => onDelete(campaign),
                                className: "text-destructive",
                            },
                            React.createElement(Trash2, { className: "mr-2 h-4 w-4" }),
                            "Delete Campaign"
                        )
                    )
                );
            },
        },
    ];
