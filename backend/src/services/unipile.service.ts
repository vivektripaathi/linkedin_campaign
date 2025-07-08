import axios from "axios";
import { IAccount, IAttendee, IChat, IChatWithAttendee, IMessage, UnipileConnectFailureResponse, UnipileConnectSuccessResponse } from "../utils/types/unipile.js";
import { UnipileClient } from "unipile-node-sdk"
import { InvalidUnipileCredentialsException, NotFoundException } from "../utils/exceptions.js";
import { SendMessageRequestDto } from "../dto/chat.dto.js";

export class UnipileService {
    private _getClient() {
        return new UnipileClient(
            process.env.UNIPILE_API_BASE_URL as string,
            process.env.UNIPILE_API_KEY as string
        );
    }


    async connectLinkedin(
        sessionCookie: string,
        userAgent: string
    ): Promise<UnipileConnectSuccessResponse> {
        try {
            const response = await axios.post<UnipileConnectSuccessResponse>(
                `${process.env.UNIPILE_API_BASE_URL}/api/v1/accounts`,
                {
                    provider: "LINKEDIN",
                    'access_token': sessionCookie,
                    "user_agent": userAgent
                },
                {
                    headers: {
                        "X-API-KEY": process.env.UNIPILE_API_KEY,
                        "accept": "application/json",
                        "content-type": "application/json"
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw new InvalidUnipileCredentialsException();
        }
    }

    private _prepareAccount(account: any): IAccount {
        return {
            id: account?.id,
            name: account?.name,
            providerId: account?.connection_params?.im?.id,
            username: account?.connection_params?.im?.username,
            publicIdentifier: account?.connection_params?.im?.publicIdentifier,
        }
    }

    async retrieveAccount(accountId: string): Promise<IAccount> {
        try {
            const client = this._getClient();
            const response = await client.account.getOne(accountId)
            return this._prepareAccount(response);
        } catch (error) {
            throw new NotFoundException(`Account does not exists with ${accountId}`);
        }
    }

    private _prepareAttendee(attendee: any): IAttendee {
        return {
            id: attendee?.id,
            name: attendee?.name,
            providerId: attendee?.provider_id,
            pictureUrl: attendee?.picture_url
        }
    }

    async getAllAttendees(): Promise<Array<IAttendee>> {
        try {
            const client = this._getClient();
            const response = await client.messaging.getAllAttendees()
            return response?.items?.map(this._prepareAttendee.bind(this));
        } catch (error) {
            throw error
        }
    }

    private _prepareChat(chat: any): IChat {
        return {
            id: chat?.id,
            accountId: chat?.account_id,
            attendeeProviderId: chat?.attendee_provider_id
        }
    }

    private _mergeChatsWithAttendees(chats: Array<IChat>, attendees: Array<IAttendee>): Array<IChatWithAttendee> {
        return chats.map(chat => {
            const attendee = attendees.find(attendee => attendee.providerId === chat.attendeeProviderId);
            return {
                ...chat,
                attendeeName: attendee?.name ?? 'N/A',
                attendeePictureUrl: attendee?.pictureUrl,
            };
        });
    }


    async getAllChats(accountId?: string): Promise<Array<IChatWithAttendee>> {
        try {
            const client = this._getClient();
            const attendees = await this.getAllAttendees();
            const chatsResponse = await client.messaging.getAllChats({
                account_id: accountId,
                limit: 250,
            })
            const chats = chatsResponse?.items?.map(this._prepareChat.bind(this));
            return this._mergeChatsWithAttendees(chats, attendees);
        } catch (error) {
            throw error;
        }
    }

    private _prepareMessage(message: any): IMessage {
        return {
            id: message?.id,
            text: message?.text,
            chatId: message?.chat_id,
            timestamp: message?.timestamp,
            accountId: message?.account_id,
            senderProviderId: message?.sender_id
        }
    }

    async getAllMessagesFromChat(chatId: string): Promise<Array<IMessage>> {
        try {
            const client = this._getClient();
            const response = await client.messaging.getAllMessagesFromChat({
                chat_id: chatId,
            });
            return response?.items?.map(this._prepareMessage.bind(this))
        } catch (error) {
            throw new NotFoundException(`Chat does not exists with ${chatId}`);
        }
    }

    async getAllMessages(accountId?: string): Promise<Array<IMessage>> {
        try {
            const client = this._getClient();
            const response = await client.messaging.getAllMessages({
                account_id: accountId,
                limit: 250,
            })
            return response?.items?.map(this._prepareMessage.bind(this))
        } catch (error) {
            throw error;
        }
    }

    async sendMessageInChat(
        { chatId, text }: { chatId: string, text: string }
    ): Promise<void> {
        try {
            const client = this._getClient();
            await client.messaging.sendMessage({
                chat_id: chatId,
                text: text
            })
        } catch (error) {
            throw error;
        }
    }

    async deleteAccount(accountId: string): Promise<void> {
        try {
            const client = this._getClient();
            await client.account.delete(accountId);
        } catch (error) {
            throw new NotFoundException(`Account does not exist on unipile with id ${accountId}`);
        }
    }
}
