import { BaseDomainModel } from './base.dto.js';
import { IsDate, IsEmail, IsString, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';
import { UUIDTypes } from 'uuid';

export class UserDomainModel extends BaseDomainModel {
    email!: string;
    password!: string;
} 

export class UserSignupRequestDto implements Pick<UserDomainModel,  'email' | 'password'> {
    @Expose()
    @IsEmail()
    email!: string;

    @Expose()
    @IsString()
    password!: string;
}
