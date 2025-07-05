"use client";

import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Badge } from "@components/ui/badge";
import { ScrollArea } from "@components/ui/scroll-area";
import { cn } from "@lib/utils";
import type { ChatViewInterface } from "@lib/types";

interface ChatListProps {
    chats: ChatViewInterface[];
    selectedChatId?: string;
    onChatSelect: (chatId: string) => void;
}

export function ChatList({
    chats,
    selectedChatId,
    onChatSelect,
}: ChatListProps) {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredChats = chats.filter((chat) =>
        chat.attendeeName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = Math.floor(
            (now.getTime() - date.getTime()) / (1000 * 60 * 60)
        );

        if (diffInHours < 1) {
            const diffInMinutes = Math.floor(
                (now.getTime() - date.getTime()) / (1000 * 60)
            );
            return `${diffInMinutes}m`;
        } else if (diffInHours < 24) {
            return `${diffInHours}h`;
        } else if (diffInHours < 48) {
            return "Yesterday";
        } else {
            const diffInDays = Math.floor(diffInHours / 24);
            return `${diffInDays}d`;
        }
    };

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    return (
        <div className="flex flex-col h-full border-r w-full overflow-hidden">
            {/* Fixed Header */}
            <div className="p-3 md:p-4 border-b bg-background shrink-0 sticky top-0 z-20">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                    <h2 className="text-lg md:text-xl font-semibold">Chats</h2>
                    <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 md:h-9 md:w-9 shrink-0"
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        placeholder="Chats search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-9 md:h-10 w-full"
                    />
                </div>
            </div>

            {/* Scrollable Chat List */}
            <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                    <div className="p-1 md:p-2">
                        {filteredChats.map((chat) => (
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
                                            src={
                                                chat.attendeePictureUrl
                                            }
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
