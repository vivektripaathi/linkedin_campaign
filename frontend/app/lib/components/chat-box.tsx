"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import {
    Send,
    Phone,
    Video,
    MoreHorizontal,
    Smile,
    Paperclip,
    Mic,
    ArrowLeft,
} from "lucide-react";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { ScrollArea } from "@components/ui/scroll-area";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import {
    type ChatViewInterface,
    type MessageViewInterface
} from "@lib/types";


import { cn } from "@lib/utils";

const CURRENT_USER_PROVIDER_ID = "ACoAAFBA9dUBBkgN3_tXHcj3uyjn2EXANH2W3Gg";


interface ChatBoxProps {
    chat: ChatViewInterface | null;
    messages: MessageViewInterface[];
    onSendMessage: (chatId: string, content: string) => void;
    onBack?: () => void;
}

export function ChatBox({
    chat,
    messages,
    onSendMessage,
    onBack,
}: ChatBoxProps) {
    const [message, setMessage] = useState("");
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollAreaRef.current) {
            const scrollContainer = scrollAreaRef.current.querySelector(
                "[data-radix-scroll-area-viewport]"
            );
            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
            }
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (message.trim() && chat) {
            onSendMessage(chat.id, message.trim());
            setMessage("");
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatMessageTime = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    if (!chat) {
        return (
            <div className="flex-1 flex items-center justify-center bg-muted/20 w-full overflow-hidden">
                <div className="text-center px-4">
                    <h3 className="text-lg font-medium text-muted-foreground mb-2">
                        No chat selected
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Choose a conversation to start messaging
                    </p>
                </div>
            </div>
        );
    }

    // Sort messages by timestamp
    const sortedMessages = [...messages].sort(
        (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    return (
        <div className="flex-1 flex flex-col w-full h-full overflow-hidden">
            {/* Fixed Chat Header */}
            <div className="flex items-center justify-between p-3 md:p-4 border-b bg-background shrink-0 sticky top-0 z-20">
                <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                    {/* Mobile back button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="md:hidden h-8 w-8 p-0 shrink-0"
                        onClick={onBack}
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>

                    <div className="relative shrink-0">
                        <Avatar className="h-8 w-8 md:h-10 md:w-10">
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
                        {/* Optional: Online status (can be commented out) */}
                        {chat.isOnline && (
                            <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 md:h-3 md:w-3 bg-green-500 border-2 border-background rounded-full" />
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-sm md:text-base truncate">
                            {chat.attendeeName}
                        </h3>
                        <p className="text-xs md:text-sm text-muted-foreground truncate">
                            {/* Optional: Online/Last seen status (can be commented out) */}
                            {chat.isOnline
                                ? "Online"
                                : `Last seen ${chat.lastSeen}`}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hidden sm:inline-flex"
                    >
                        <Phone className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 hidden sm:inline-flex"
                    >
                        <Video className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                            >
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Search Messages</DropdownMenuItem>
                            <DropdownMenuItem>Clear Chat</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                                Block User
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Scrollable Messages Area */}
            <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full" ref={scrollAreaRef}>
                    <div className="p-3 md:p-4 space-y-3 md:space-y-4 w-full">
                        {sortedMessages.map((msg) => {
                            const isCurrentUser =
                                msg.senderProviderId ===
                                CURRENT_USER_PROVIDER_ID;
                            const senderName = isCurrentUser
                                ? "You"
                                : chat.attendeeName;

                            return (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        "flex gap-2 md:gap-3 w-full",
                                        isCurrentUser
                                            ? "justify-end"
                                            : "justify-start"
                                    )}
                                >
                                    {!isCurrentUser && (
                                        <Avatar className="h-6 w-6 md:h-8 md:w-8 shrink-0">
                                            <AvatarImage
                                                src={
                                                    chat.attendeePictureUrl
                                                }
                                                alt={chat.attendeeName}
                                            />
                                            <AvatarFallback className="text-xs">
                                                {getInitials(chat.attendeeName)}
                                            </AvatarFallback>
                                        </Avatar>
                                    )}

                                    <div
                                        className={cn(
                                            "max-w-[80%] sm:max-w-[75%] md:max-w-[70%] rounded-lg px-3 py-2 break-words",
                                            isCurrentUser
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted"
                                        )}
                                    >
                                        <p className="text-sm leading-relaxed break-words hyphens-auto whitespace-pre-wrap">
                                            {msg.text}
                                        </p>
                                        <div className="flex items-center justify-end gap-1 mt-1">
                                            <span
                                                className={cn(
                                                    "text-xs whitespace-nowrap",
                                                    isCurrentUser
                                                        ? "text-primary-foreground/70"
                                                        : "text-muted-foreground"
                                                )}
                                            >
                                                {formatMessageTime(
                                                    msg.timestamp
                                                )}
                                            </span>
                                            {/* Optional: Read receipts (can be commented out) */}
                                            {isCurrentUser && msg.isRead && (
                                                <div className="text-xs text-primary-foreground/70">
                                                    ✓✓
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Add some extra padding at the bottom for better scrolling */}
                        <div className="h-4" />
                    </div>
                </ScrollArea>
            </div>

            {/* Fixed Message Input */}
            <div className="border-t bg-background shrink-0 sticky bottom-0 z-20">
                <div className="p-3 md:p-4">
                    <div className="flex items-end gap-2 w-full">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-9 w-9 p-0 shrink-0 mb-0.5 hidden sm:inline-flex"
                        >
                            <Paperclip className="h-4 w-4" />
                        </Button>
                        <div className="flex-1 relative min-w-0">
                            <Input
                                placeholder="Enter message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="pr-10 min-h-[40px] w-full"
                            />
                            <Button
                                variant="ghost"
                                size="sm"
                                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                            >
                                <Smile className="h-4 w-4" />
                            </Button>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-9 w-9 p-0 shrink-0 mb-0.5 hidden md:inline-flex"
                        >
                            <Mic className="h-4 w-4" />
                        </Button>
                        <Button
                            onClick={handleSendMessage}
                            disabled={!message.trim()}
                            className="h-9 shrink-0 mb-0.5"
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
