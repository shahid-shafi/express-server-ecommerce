import jwt, { Secret } from 'jsonwebtoken';
interface cookieOptions {
    expires: Date,
    httpOnly: boolean,
    secure?: boolean
}

interface ITokenPayload {
    id: string;
    role: string;
}

const secret: Secret = process.env.JWT_SECRET || 'your-secret-key';

export const signToken = (id: string) => {
    return jwt.sign({ id }, secret, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });
};

export const verifyToken = (token: string): ITokenPayload => {
    return jwt.verify(token, secret) as ITokenPayload;
};