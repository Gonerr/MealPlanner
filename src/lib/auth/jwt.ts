import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fjrl34rlf';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'weee123';
const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

export interface TokenPayload {
    userId: string;
    email:string;
    role?: string;
}

export const generateAccessToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, JWT_SECRET, {expiresIn: ACCESS_TOKEN_EXPIRY}); 
}

export const generateRefreshToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, REFRESH_SECRET, {expiresIn: REFRESH_TOKEN_EXPIRY}); 
}

export const verifyAccessToken = (token: string): TokenPayload | null => {
    try {
        return jwt.verify(token, JWT_SECRET) as TokenPayload;
    } catch (err) {
        return null;
    }
}

export const verifyRefreshToken = (token: string): TokenPayload | null => {
    try {
        return jwt.verify(token, REFRESH_SECRET) as TokenPayload;
    } catch (err) {
        return null;
    }
}