import bcrypt from 'bcryptjs';
import { error } from 'console';
import {NextRequest, NextResponse} from 'next/server';
import { generateAccessToken, generateRefreshToken } from '../../../../lib/auth/jwt';
import { cookies } from 'next/headers';

// Логика поиска пользователей в БД
const findUserByEmail = async (email: string) => {
    if (email === 'user@example.com') {
        return {
            id: '1',
            email: 'user@example.com',
            password: await bcrypt.hash('password123', 10),
            role: 'user'
        }
    }
    return null;
}

export  async function POST (request: NextRequest) {
    try {
        const {email, password} = await request.json();

        const user = await findUserByEmail(email);

        if (!user) {
            return NextResponse.json(
                {error: 'Invalid credentials'},
                {status: 401}
            );
        }

        // Проверка пароля
        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword) {
            return NextResponse.json(
                {error: 'Invalid credentials'},
                {status: 401}
            );
        }

        const payload = {
            userId: user.id, 
            email: user.email,
            role: user.role
        }

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        const cookieStore = await cookies();

        cookieStore.set('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 
        });

        cookieStore.set('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 
        });

        return NextResponse.json({
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        return NextResponse.json(
            {error: 'Internal server error'},
            {status: 500}
        )
    }
}