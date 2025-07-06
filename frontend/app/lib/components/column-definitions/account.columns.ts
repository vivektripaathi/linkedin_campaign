import React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Tooltip } from "@components/tooltip";
import type { AccountViewInterface } from "@lib/types";
import { MoreHorizontal, MessageSquare, Trash, Trash2 } from "lucide-react";
import { Button } from "@components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";

export const createAccountColumns = ({ deleteAccount }: { deleteAccount: (account: AccountViewInterface) => void }): ColumnDef<AccountViewInterface>[] => [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) =>
            React.createElement(
                "div",
                { className: "max-w-[300px]" },
                React.createElement(Tooltip, {
                    title: "name",
                    description: row.getValue("name") as string,
                    maxLength: 60,
                })
            ),
    },
    {
        accessorKey: "id",
        header: "Account Id",
        cell: ({ row }) =>
            React.createElement(
                "div",
                { className: "max-w-[300px]" },
                React.createElement(Tooltip, {
                    title: "name",
                    description: row.getValue("id") as string,
                    maxLength: 60,
                })
            ),
    },
    {
        accessorKey: "providerId",
        header: "Provider Id",
        cell: ({ row }) =>
            React.createElement(
                "div",
                { className: "max-w-[300px]" },
                React.createElement(Tooltip, {
                    title: "Provider Id",
                    description: row.getValue("providerId") as string,
                    maxLength: 60,
                })
            ),
    },
    {
        accessorKey: "username",
        header: "Username",
        cell: ({ row }) =>
            React.createElement(
                "div",
                { className: "max-w-[300px]" },
                React.createElement(Tooltip, {
                    title: "Username",
                    description: row.getValue("username") as string,
                    maxLength: 60,
                })
            ),
    },
    {
        accessorKey: "publicIdentifier",
        header: "Public Identifier",
        cell: ({ row }) =>
            React.createElement(
                "div",
                { className: "max-w-[300px]" },
                React.createElement(Tooltip, {
                    title: "Public Identifier",
                    description: row.getValue("publicIdentifier") as string,
                    maxLength: 60,
                })
            ),
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const account = row.original;

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
                            onClick: () => deleteAccount(account),
                        },
                        React.createElement(Trash2, { className: "h-4 w-4" }),
                        "Delete Account"
                    ),
                )
            );
        },
    },
];
