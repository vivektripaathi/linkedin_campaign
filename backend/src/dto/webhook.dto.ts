import { Expose, Type } from "class-transformer";
import { IsArray, IsOptional, IsString } from "class-validator";

export class Attendee {
    attendee_name!: string;
    attendee_provider_id!: string;
    attendee_profile_url!: string;
}

export class NewMessageWebhook {
    chat_id!: string;
    message_id!: string;
    message!: string;
    timestamp!: string;
    account_id!: string;
    sender!:  Attendee;
    attendees!: Array<Attendee>;
}

export class NewMessageWebhookRequestDto implements NewMessageWebhook{
    @Expose()
    @IsString()
    chat_id!: string;

    @Expose()
    @IsString()
    message_id!: string;

    @Expose()
    @IsString()
    message!: string;

    @Expose()
    @IsString()
    timestamp!: string;

    @Expose()
    @IsString()
    account_id!: string;

    @Expose()
    @Type(() => Attendee)
    sender!: Attendee;

    @Expose()
    @IsArray()
    @Type(() => Attendee)
    attendees!: Array<Attendee>;
}
