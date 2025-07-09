import { BaseDomainModel } from './base.dto.js';
import { IsEmail, IsString, IsUUID } from 'class-validator';
import { Expose } from 'class-transformer';
import { UUIDTypes } from 'uuid';

export class UserDomainModel extends BaseDomainModel {
    email!: string;
    name!: string;
    password!: string;
}

export class UserSignupRequestDto implements Pick<UserDomainModel, 'email' | 'password'> {
    @Expose()
    @IsEmail()
    email!: string;

    @Expose()
    @IsString()
    name!: string;

    @Expose()
    @IsString()
    password!: string;
}

export class UserLoginRequestDto implements Pick<UserDomainModel, 'email' | 'password'> {
    @Expose()
    @IsEmail()
    email!: string;

    @Expose()
    @IsString()
    password!: string;
}
