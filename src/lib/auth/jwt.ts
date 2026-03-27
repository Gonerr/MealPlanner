import { JWTPayload, SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'fjrl34rlf';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'weee123';

const accessSecret = new TextEncoder().encode(JWT_SECRET);
const refreshSecret = new TextEncoder().encode(REFRESH_SECRET);

const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';

export interface TokenPayload extends JWTPayload {
    userId: string;
    email: string;
    role?: string;
}

/**
 * Генерация access token
 */
export async function generateAccessToken(payload: TokenPayload): Promise<string> {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime(ACCESS_TOKEN_EXPIRY)
        .setIssuedAt()
        .sign(accessSecret);
}

/**
 * Генерация refresh token
 */
export async function generateRefreshToken(payload: TokenPayload): Promise<string> {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime(REFRESH_TOKEN_EXPIRY)
        .setIssuedAt()
        .sign(refreshSecret);
}

/**
 * Проверка access token (для middleware и API)
 */
export async function verifyAccessToken(token: string): Promise<TokenPayload | null> {
    try {
        const { payload } = await jwtVerify(token, accessSecret);
        return payload as TokenPayload;
    } catch (err) {
        console.log('Access token invalid:', err);
        return null;
    }
}

/**
 * Проверка refresh token
 */
export async function verifyRefreshToken(token: string): Promise<TokenPayload | null> {
    try {
        const { payload } = await jwtVerify(token, refreshSecret);
        return payload as TokenPayload;
    } catch (err) {
        console.log('Refresh token invalid:', err);
        return null;
    }
}