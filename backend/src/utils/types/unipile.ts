export interface UnipileConnectFailureResponse {
    status: number;
    type: string;
    title: string;
    detail: string;
}

export interface UnipileConnectSuccessResponse {
    object: string;
    account_id: string;
}

export interface IAccount {
    id: string;
    name: string;
    providerId: string;
    username: string;
    publicIdentifier: string;
}

export interface IChat {
    id: string;
    accountId: string;
    attendeeProviderId: string;
}

export interface IAttendee {
    id: string;
    name: string;
    providerId: string;
    pictureUrl?: string;
}

export interface IChatWithAttendee extends IChat {
    attendeeName: string;
    attendeePictureUrl?: string;
}

export interface IMessage {
    id: string;
    text: string;
    chatId: string;
    timestamp: string;
    senderProviderId: string;
}