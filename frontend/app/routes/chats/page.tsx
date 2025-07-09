"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { cn, getLinkedAccounts } from "@lib/utils";
import socket from "@lib/socket";

import { ChatList } from "@components/chat-list";
import { ChatBox } from "@components/chat-box";
import type {
    AccountViewInterface,
    ChatViewInterface,
    IAccount,
    IChat,
    IMessage,
    MessageViewInterface,
} from "@lib/types";

export default function Chats() {
    const [chats, setChats] = useState<ChatViewInterface[]>([]);
    const [messages, setMessages] = useState<MessageViewInterface[]>([]);
    const [selectedChatMessages, setSelectedChatMessages] = useState<
        MessageViewInterface[]
    >([]);
    const [selectedChatId, setSelectedChatId] = useState<string>();
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isFetchingMessage, setIsFetchingMessage] = useState<boolean>(false);
    const [showChatList, setShowChatList] = useState(true);
    const [isSending, setIsSending] = useState<boolean>(false);
    const [accounts, setAccounts] = useState<AccountViewInterface[]>([]);

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

    const _prepareMessagesForView = (
        messages: IMessage[]
    ): MessageViewInterface[] =>
        messages.map((message) => ({
            id: message?._id,
            accountId: message?.accountId,
            text: message?.text,
            chatId: message?.chatId,
            timestamp: message?.timestamp,
            senderProviderId: message?.senderProviderId,
        }));

    const fetchMessageByChatId = async (
        chatId: string
    ): Promise<MessageViewInterface[]> => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/messages/${chatId}`
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

    const _prepareAccountForView = (
        account: IAccount
    ): AccountViewInterface => {
        return {
            id: account._id,
            name: account.name,
            username: account.username,
            providerId: account.providerId,
            publicIdentifier: account.publicIdentifier,
        };
    };

    const initializePage = async () => {
        try {
            setIsPageLoading(true);
            setChats(await fetchChats());
            setMessages(await fetchMessages());
            setAccounts(
                (await getLinkedAccounts()).map(_prepareAccountForView)
            );
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "Failed to load page"
            );
        } finally {
            setIsPageLoading(false);
        }
    };

    useEffect(() => {
        initializePage();

        socket.on("connect", () => {
            console.log("✅ Socket connected:");
        });

        socket.on(
            "new_message",
            ({
                chat,
                message,
            }: {
                chat: ChatViewInterface;
                message: MessageViewInterface;
            }) => {
                // console.log("📩 Received message via socket", {
                //     chat,
                //     message,
                // });

                setMessages((prevMessages) => [...prevMessages, message]);

                setChats((prevChats) => {
                    const exists = prevChats.find((c) => c.id === chat.id);
                    if (exists) {
                        // update last message if it's existing
                        return prevChats.map((c) =>
                            c.id === chat.id
                                ? { ...c, lastMessage: message.text }
                                : c
                        );
                    } else {
                        // new chat
                        return [
                            {
                                id: chat.id,
                                accountId: chat.accountId,
                                attendeeName: chat.attendeeName,
                                attendeeProviderId: chat.attendeeProviderId,
                                attendeePictureUrl: chat.attendeePictureUrl,
                                lastMessage: message.text,
                            },
                            ...prevChats,
                        ];
                    }
                });

                if (chat.id === selectedChatId)
                    setSelectedChatMessages((prevMessages) => [
                        ...prevMessages,
                        message,
                    ]);

                if (chat.id === selectedChatIdRef.current)
                    setSelectedChatMessages((prevMessages) => [
                        ...prevMessages,
                        message,
                    ]);
            }
        );

        return () => {
            socket.off("new_message");
        };
    }, []);

    useEffect(() => {
        if (!chats.length) return;
        // Always join the hardcoded websocket room
        socket.emit("join", "web_socket_key");
    }, [chats]);

    const selectedChat = chats.find((chat) => chat.id === selectedChatId);
    const selectedChatIdRef = useRef<string | undefined>(undefined);

    const handleSendMessage = async (chatId: string, content: string) => {
        try {
            setIsSending(true);
            const response = await fetch(
                `${
                    import.meta.env.VITE_API_BASE_URL
                }/api/chats/${chatId}/messages`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ text: content }),
                }
            );

            if (!response.ok) throw new Error("Failed to send message");

            toast.success("Message sent!");
        } catch (error) {
            console.error("Send message failed:", error);
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to send message"
            );
        } finally {
            setIsSending(false);
        }
    };

    const handleChatSelect = async (chatId: string) => {
        selectedChatIdRef.current = chatId;
        setIsFetchingMessage(true);
        setSelectedChatId(chatId);
        setSelectedChatMessages(await fetchMessageByChatId(chatId));
        setIsFetchingMessage(false);
        setShowChatList(false); // Hide chat list on mobile when chat is selected
    };

    const handleBackToChatList = () => {
        selectedChatIdRef.current = undefined;
        setShowChatList(true);
        setSelectedChatId(undefined);
        setSelectedChatMessages([]);
    };

    if (isPageLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <p className="text-muted-foreground">Loading chats...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden">
            <div
                className={cn(
                    "w-full md:w-80 md:flex-shrink-0 md:block h-full overflow-hidden",
                    showChatList ? "block" : "hidden md:block"
                )}
            >
                <div className="flex flex-col h-full">
                    <ChatList
                        chats={chats}
                        selectedChatId={selectedChatId}
                        onChatSelect={handleChatSelect}
                    />
                </div>
            </div>

            <div
                className={cn(
                    "flex-1 md:block h-full overflow-hidden",
                    !showChatList ? "block" : "hidden md:block"
                )}
            >
                <div className="flex flex-col h-full">
                    <ChatBox
                        chat={selectedChat || null}
                        messages={selectedChatMessages}
                        onSendMessage={handleSendMessage}
                        onBack={handleBackToChatList}
                        isSending={isSending}
                        providerIds={accounts.map(
                            (account) => account.providerId
                        )}
                        isLoading={isFetchingMessage}
                    />
                </div>
            </div>
        </div>
    );
}
