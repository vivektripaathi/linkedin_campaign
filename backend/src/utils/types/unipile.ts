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
    attendee?: IAttendee;
}

export interface IAttendee {
    id: string;
    name: string;
    accountId: string;
    providerId: string;
    pictureUrl?: string;
    profileUrl?: string;
}

export interface IMessage {
    id: string;
    text: string;
    chatId: string;
    accountId: string;
    timestamp: string;
    senderProviderId: string;
}