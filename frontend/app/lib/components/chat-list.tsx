"use client";

import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Badge } from "@components/ui/badge";
import { ScrollArea } from "@components/ui/scroll-area";
import { cn, getInitials } from "@lib/utils";
import {
    SortByEnum,
    SortOrderEnum,
    type AccountViewInterface,
    type ChatFilters,
    type ChatViewInterface,
} from "@lib/types";
import { ChatFilter } from "@components/chat-filter";

interface ChatListProps {
    chats: ChatViewInterface[];
    selectedChatId?: string;
    onChatSelect: (chatId: string) => void;
    accounts: AccountViewInterface[];
}

export function ChatList({
    chats,
    selectedChatId,
    onChatSelect,
    accounts,
}: ChatListProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState<ChatFilters>({
        accountId: undefined,
        attendeeName: "",
        sortBy: SortByEnum.CREATED_AT,
        sortOrder: SortOrderEnum.DESC,
    });

    // Filter and sort chats based on search query and filters
    const filteredAndSortedChats = chats
        .filter((chat) => {
            // Search query filter
            if (
                searchQuery &&
                !chat.attendeeName
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
            ) {
                return false;
            }

            // Account filter
            if (filters.accountId && chat.accountId !== filters.accountId) {
                return false;
            }

            // Attendee name filter
            if (
                filters.attendeeName &&
                !chat.attendeeName
                    .toLowerCase()
                    .includes(filters.attendeeName.toLowerCase())
            ) {
                return false;
            }

            return true;
        })
        .sort((a, b) => {
            let comparison = 0;

            if (filters.sortBy === "createdAt") {
                comparison =
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime();
            }

            return filters.sortOrder === "desc" ? -comparison : comparison;
        });

    return (
        <div className="flex flex-col h-full border-r w-full overflow-hidden">
            <div className="p-3 md:p-4 border-b bg-background shrink-0 sticky top-0 z-20">
                <div className="flex items-center justify-between">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder="Search chats..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 h-9 md:h-10 w-full"
                        />
                    </div>
                    <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 md:h-9 md:w-9 shrink-0"
                    >
                        <ChatFilter
                            filters={filters}
                            onFiltersChange={setFilters}
                            accounts={accounts}
                            totalChats={chats.length}
                            filteredChats={filteredAndSortedChats.length}
                        />
                    </Button>
                </div>
            </div>

            {/* Scrollable Chat List */}
            <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                    <div className="p-1 md:p-2">
                        {filteredAndSortedChats.map((chat) => (
                            <div
                                key={chat.id}
                                className={cn(
                                    "flex items-center gap-3 p-3 md:p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors active:bg-muted/70 touch-manipulation w-full",
                                    selectedChatId === chat.id && "bg-muted"
                                )}
                                onClick={() => onChatSelect(chat.id)}
                            >
                                <div className="relative shrink-0">
                                    <Avatar className="h-10 w-10 md:h-10 md:w-10">
                                        <AvatarImage
                                            src={chat.attendeePictureUrl}
                                            alt={chat.attendeeName}
                                        />
                                        <AvatarFallback>
                                            {getInitials(chat.attendeeName)}
                                        </AvatarFallback>
                                    </Avatar>

                                    {chat.isOnline && (
                                        <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1 gap-2">
                                        <h3 className="font-medium text-sm md:text-sm truncate flex-1">
                                            {chat.attendeeName}
                                        </h3>
                                        <div className="flex items-center gap-2 shrink-0">
                                            {chat.unreadCount &&
                                                chat.unreadCount > 0 && (
                                                    <Badge
                                                        variant="default"
                                                        className="h-5 w-5 p-0 flex items-center justify-center text-xs shrink-0"
                                                    >
                                                        {chat.unreadCount}
                                                    </Badge>
                                                )}
                                        </div>
                                    </div>

                                    {chat.lastMessage && (
                                        <div className="flex items-center gap-1">
                                            <p className="text-sm text-muted-foreground truncate">
                                                {chat.lastMessage}
                                            </p>
                                        </div>
                                    )}

                                    {!chat.isOnline && chat.lastSeen && (
                                        <p className="text-xs text-muted-foreground mt-1 truncate">
                                            Last seen {chat.lastSeen}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Add some extra padding at the bottom for better scrolling */}
                        <div className="h-4" />
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}
