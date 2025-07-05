"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { cn } from "@lib/utils";

import { ChatList } from "@components/chat-list";
import { ChatBox } from "@components/chat-box";
import type {
    ChatViewInterface,
    IChat,
    IMessage,
    MessageViewInterface,
} from "@lib/types";

const CURRENT_USER_PROVIDER_ID = "ACoAAFBA9dUBBkgN3_tXHcj3uyjn2EXANH2W3Gg";

export default function Chats() {
    const [chats, setChats] = useState<ChatViewInterface[]>([]);
    const [messages, setMessages] = useState<MessageViewInterface[]>([]);
    const [selectedChatId, setSelectedChatId] = useState<string>();
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [showChatList, setShowChatList] = useState(true);

    const _prepareChatsForView = (chats: IChat[]): ChatViewInterface[] =>
        chats.map((chat) => ({
            id: chat?._id,
            accountId: chat?.accountId,
            attendeeName: chat?.attendeeName,
            attendeeProviderId: chat?.attendeeProviderId,
            attendeePictureUrl: chat?.attendeePictureUrl,
        }));

    const fetchChats = async (): Promise<ChatViewInterface[]> => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/chats`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch chats");
            }
            const data = await response.json();
            return _prepareChatsForView(data);
        } catch (error) {
            throw new Error("Failed to load chats");
        }
    };

    const _prepareMessagesForView = (messages: IMessage[]): MessageViewInterface[] =>
        messages.map((message) => ({
            id: message?._id,
            accountId: message?.accountId,
            text: message?.text,
            chatId: message?.chatId,
            timestamp: message?.timestamp,
            senderProviderId: message?.senderProviderId,
        }));

    const fetchMessages = async (): Promise<MessageViewInterface[]> => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/messages`
            );
            if (!response.ok) {
                throw new Error("Failed to fetch messages");
            }
            const data = await response.json();
            return _prepareMessagesForView(data);
        } catch (error) {
            throw new Error("Failed to load messages");
        }
    };

    const initializePage = async () => {
        try {
            setIsPageLoading(true);
            setChats(await fetchChats());
            setMessages(await fetchMessages());
        } catch (error) {
            toast.error(
                (error instanceof Error ? error.message : "Failed to load page")
            );
        } finally {
            setIsPageLoading(false);
        }
    }

    useEffect(() => {
        initializePage();
    }, []);

    const selectedChat = chats.find((chat) => chat.id === selectedChatId);
    const selectedChatMessages = messages.filter(
        (msg) => msg.chatId === selectedChatId
    );

    const handleSendMessage = (chatId: string, content: string) => {
        const newMessage: MessageViewInterface = {
            id: Date.now().toString(),
            accountId: "t5fp2R9rSyCQGivyj7zSgA", // Use your account ID
            chatId,
            text: content,
            timestamp: new Date().toISOString(),
            senderProviderId: CURRENT_USER_PROVIDER_ID,
            // Optional enhancements
            isRead: true,
            deliveryStatus: "sent",
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);

        // Update last message in chat
        setChats((prevChats) =>
            prevChats.map((chat) =>
                chat.id === chatId
                    ? { ...chat, lastMessage: newMessage.text }
                    : chat
            )
        );

        toast.success("Message sent!");
    };

    const handleChatSelect = (chatId: string) => {
        setSelectedChatId(chatId);
        setShowChatList(false); // Hide chat list on mobile when chat is selected
    };

    const handleBackToChatList = () => {
        setShowChatList(true);
        setSelectedChatId(undefined);
    };

    if (isPageLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="text-muted-foreground">
                        Loading chats...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-1 h-[calc(100vh-3.5rem)] md:h-[calc(100vh-4rem)] overflow-hidden">
            <div
                className={cn(
                    "w-full md:w-80 md:flex-shrink-0 md:block h-full",
                    showChatList ? "block" : "hidden md:block"
                )}
            >
                <ChatList
                    chats={chats}
                    selectedChatId={selectedChatId}
                    onChatSelect={handleChatSelect}
                />
            </div>

            <div
                className={cn(
                    "flex-1 md:block overflow-hidden h-full",
                    !showChatList ? "block" : "hidden md:block"
                )}
            >
                <ChatBox
                    chat={selectedChat || null}
                    messages={selectedChatMessages}
                    onSendMessage={handleSendMessage}
                    onBack={handleBackToChatList}
                />
            </div>
        </div>
    );
}
