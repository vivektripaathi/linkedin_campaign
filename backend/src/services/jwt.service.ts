import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
const JWT_EXPIRES_IN = '7d';


export class JwtService {
    static sign(payload: jwt.JwtPayload): string {
        return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    }

    static verify(token: string) {
        return jwt.verify(token, JWT_SECRET);
    }
} 