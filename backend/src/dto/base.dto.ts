import { Expose } from "class-transformer";
import { IsString, IsUUID } from "class-validator";

export class BaseDomainModel {
    _id!: string;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt: Date | null = null;
}

export class ParamIdRequestDto {
    @Expose()
    @IsUUID('4', { message: 'Invalid id. Must be a valid UUID v4.' })
    id!: string;
}

export class ParamStringIdRequestDto {
    @Expose()
    @IsString()
    id!: string;
}
