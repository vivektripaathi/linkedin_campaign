import { Expose } from "class-transformer";
import { IsUUID } from "class-validator";
import { Date } from "mongoose";

export class BaseDomainModel {
    _id!: string;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt: Date | null = null;
}

export class ParamIdRequestDto {
    @Expose()
    @IsUUID('4', { message: 'Invalid campaign ID. Must be a valid UUID v4.' })
    id!: string;
}
