import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';


export interface LinkedInProfile {
    name: string
    job_title: string
    company: string
    location: string
    summary: string
}


export class LinkedInProfileRequestDto implements LinkedInProfile {
    @Expose()
    @IsString()
    name!: string;

    @Expose()
    @IsString()
    job_title!: string;

    @Expose()
    @IsString()
    company!: string;

    @Expose()
    @IsString()
    location!: string;

    @Expose()
    @IsString()
    summary!: string;
}
