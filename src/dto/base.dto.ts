import { Expose } from "class-transformer";
import { IsUUID } from "class-validator";

export class BaseDomainModel {
    _id!: string;
    createdAt!: string;
    updatedAt!: string;
    __v!: number;
}

export class ParamIdRequestDto {
    @Expose()
    @IsUUID('4', { message: 'Invalid campaign ID. Must be a valid UUID v4.' })
    id!: string;
}
