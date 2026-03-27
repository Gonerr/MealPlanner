import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { generateAccessToken, generateRefreshToken } from '@/lib/auth/jwt';
import { initDB } from '@/lib/db/db';  // ← Используем initDB

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();
        
        // Инициализируем БД (создаст таблицу если её нет)
        const db = await initDB();
        
        // Ищем пользователя
        const user = await db.get(
            'SELECT * FROM users WHERE email = ?',
            [email.toLowerCase()]
        );
        
        if (!user) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }
        
        // Проверка пароля
        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        
        if (!isValidPassword) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }
        
        const payload = {
            userId: user.id.toString(),
            email: user.email,
            role: user.role
        };
        
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
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}