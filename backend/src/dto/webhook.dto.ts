import { Expose, Type } from "class-transformer";
import { IsArray, IsOptional, IsString } from "class-validator";

export class Attendee {
    attendee_name!: string;
    attendee_provider_id!: string;
    attendee_profile_url!: string;
}

export class NewMessageWebhook {
    chat_id!: string;
    message!: string;
    timestamp!: string;
    account_id!: string;
    sender!:  Array<Attendee>;
    attendees!: Array<Attendee>;
    attendeeProviderId!: string;
    attendeePictureUrl?: string;
}

export class NewMessageWebhookRequestDto implements NewMessageWebhook{
    @Expose()
    @IsString()
    chat_id!: string;

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
    @IsArray()
    @Type(() => Attendee)
    sender!: Array<Attendee>;

    @Expose()
    @IsArray()
    @Type(() => Attendee)
    attendees!: Array<Attendee>;

    @Expose()
    @IsString()
    attendeeProviderId!: string;

    @Expose()
    @IsOptional()
    @IsString()
    attendeePictureUrl?: string;
}
