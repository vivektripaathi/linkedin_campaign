import { Request, Response } from 'express';
import { UserDao } from '../dao/user.dao.js';
import bcrypt from 'bcryptjs';
import { UserSignupRequestDto } from '../dto/user.dto.js';
import { JwtService } from '../services/jwt.service.js';
import { validateAndParseDto } from '../utils/validateAndParseDto.js';
import { AlreadyExistsException, InvalidCredentialsException, InvalidRequestException, NotFoundException } from '../utils/exceptions.js';
import { successResponse } from '../utils/apiResponse.js';

export class UserController {
    constructor(private readonly userDao: UserDao) { }

    async signup(req: Request, res: Response) {
        const [createRequest, errors] = await validateAndParseDto(UserSignupRequestDto, req.body ?? {});
        if (errors.length) throw new InvalidRequestException(errors.join(', '));

        const existingUser = await this.userDao.findByEmail(createRequest.email);
        if (existingUser) throw new AlreadyExistsException("User", "email");

        const hashedPassword = await bcrypt.hash(createRequest.password, 10);
        const createdUser = await this.userDao.create({
            _id: crypto.randomUUID(),
            email: createRequest.email,
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        });

        const token = JwtService.sign({ userId: createdUser._id, email: createdUser.email });
        return successResponse(res, { access_token: token }, 200);
    }

    async login(req: Request, res: Response) {
        const [createRequest, errors] = await validateAndParseDto(UserSignupRequestDto, req.body ?? {});
        if (errors.length) throw new InvalidRequestException(errors.join(', '));

        const user = await this.userDao.findByEmail(createRequest.email);
        if (!user) throw new NotFoundException(`User with email ${createRequest.email} does now exists`);

        const isMatch = await bcrypt.compare(createRequest.password, user.password);
        if (!isMatch) throw new InvalidCredentialsException();

        const token = JwtService.sign({ userId: user._id, email: user.email });
        return successResponse(res, { access_token: token }, 200);
    }
}
