"use client";

import { useState } from "react";
import { Filter, X, Calendar, User, Building2 } from "lucide-react";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select";
import { Badge } from "@components/ui/badge";
import { Separator } from "@components/ui/separator";
import {
    SortByEnum,
    SortOrderEnum,
    type AccountViewInterface,
    type ChatFilters,
} from "@lib/types";

interface ChatFilterProps {
    filters: ChatFilters;
    onFiltersChange: (filters: ChatFilters) => void;
    accounts: AccountViewInterface[];
    totalChats: number;
    filteredChats: number;
}

export function ChatFilter({
    filters,
    onFiltersChange,
    accounts,
    totalChats,
    filteredChats,
}: ChatFilterProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleFilterChange = (key: keyof ChatFilters, value: any) => {
        onFiltersChange({
            ...filters,
            [key]: value,
        });
    };

    const clearFilters = () => {
        onFiltersChange({
            accountId: undefined,
            attendeeName: "",
            sortBy: SortByEnum.CREATED_AT,
            sortOrder: SortOrderEnum.DESC,
        });
    };

    const hasActiveFilters = filters.accountId || filters.attendeeName;

    const selectedAccount = accounts.find(
        (acc) => acc.id === filters.accountId
    );

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 md:h-9 md:w-9 relative"
                >
                    <Filter className="h-4 w-4" />
                    {hasActiveFilters && (
                        <div className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full" />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4 space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4" />
                            <h3 className="font-semibold text-sm">
                                Filter Chats
                            </h3>
                        </div>
                        {hasActiveFilters && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={clearFilters}
                                className="h-7 px-2 text-xs"
                            >
                                Clear all
                            </Button>
                        )}
                    </div>

                    {/* Results Summary */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-md p-2">
                        <span>
                            Showing {filteredChats} of {totalChats} chats
                        </span>
                    </div>

                    <Separator />

                    {/* Account Filter */}
                    <div className="space-y-2">
                        <Label className="text-xs font-medium flex items-center gap-2">
                            <Building2 className="h-3 w-3" />
                            Account
                        </Label>
                        <Select
                            value={filters.accountId || ""}
                            onValueChange={(value) =>
                                handleFilterChange(
                                    "accountId",
                                    value || undefined
                                )
                            }
                        >
                            <SelectTrigger className="h-9">
                                <SelectValue placeholder="All accounts" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    All accounts
                                </SelectItem>
                                {accounts.map((account) => (
                                    <SelectItem
                                        key={account.id}
                                        value={account.id}
                                    >
                                        <div className="flex flex-col items-start">
                                            <span className="font-medium">
                                                {account.name}
                                            </span>
                                            <span className="text-xs text-muted-foreground truncate">
                                                ID: {account.id}
                                            </span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Attendee Name Filter */}
                    <div className="space-y-2">
                        <Label className="text-xs font-medium flex items-center gap-2">
                            <User className="h-3 w-3" />
                            Attendee Name
                        </Label>
                        <Input
                            placeholder="Search by attendee name..."
                            value={filters.attendeeName || ""}
                            onChange={(e) =>
                                handleFilterChange(
                                    "attendeeName",
                                    e.target.value
                                )
                            }
                            className="h-9"
                        />
                    </div>

                    <Separator />

                    {/* Sort Options */}
                    <div className="space-y-3">
                        <Label className="text-xs font-medium flex items-center gap-2">
                            <Calendar className="h-3 w-3" />
                            Sort & Order
                        </Label>

                        <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">
                                    Sort by
                                </Label>
                                <Select
                                    value={filters.sortBy}
                                    onValueChange={(
                                        value: "createdAt" | "lastMessage"
                                    ) => handleFilterChange("sortBy", value)}
                                >
                                    <SelectTrigger className="h-8">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="createdAt">
                                            Created Date
                                        </SelectItem>
                                        <SelectItem value="lastMessage">
                                            Last Message
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">
                                    Order
                                </Label>
                                <Select
                                    value={filters.sortOrder}
                                    onValueChange={(value: "asc" | "desc") =>
                                        handleFilterChange("sortOrder", value)
                                    }
                                >
                                    <SelectTrigger className="h-8">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="desc">
                                            Newest first
                                        </SelectItem>
                                        <SelectItem value="asc">
                                            Oldest first
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    {/* Active Filters */}
                    {hasActiveFilters && (
                        <>
                            <Separator />
                            <div className="space-y-2">
                                <Label className="text-xs font-medium">
                                    Active Filters
                                </Label>
                                <div className="flex flex-wrap gap-1">
                                    {selectedAccount && (
                                        <Badge
                                            variant="secondary"
                                            className="text-xs"
                                        >
                                            <Building2 className="h-3 w-3 mr-1" />
                                            {selectedAccount.name}
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                                                onClick={() =>
                                                    handleFilterChange(
                                                        "accountId",
                                                        undefined
                                                    )
                                                }
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </Badge>
                                    )}
                                    {filters.attendeeName && (
                                        <Badge
                                            variant="secondary"
                                            className="text-xs"
                                        >
                                            <User className="h-3 w-3 mr-1" />
                                            {filters.attendeeName}
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                                                onClick={() =>
                                                    handleFilterChange(
                                                        "attendeeName",
                                                        ""
                                                    )
                                                }
                                            >
                                                <X className="h-3 w-3" />
                                            </Button>
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}
