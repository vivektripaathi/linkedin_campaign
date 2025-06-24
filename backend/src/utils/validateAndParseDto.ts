import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export const validateAndParseDto = async <T>(cls: new () => T, plain: object): Promise<[T, string[]]> => {
    const dto = plainToInstance(cls, plain, { excludeExtraneousValues: true });
    const errors = await validate(dto as Object);
    const messages = errors.map(e => Object.values(e.constraints || {})).flat();
    return [dto, messages];
};
