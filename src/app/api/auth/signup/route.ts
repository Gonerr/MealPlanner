import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { initDB } from "@/lib/db/db";  // ← Используем initDB вместо openDB

const checkEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const checkPassword = (password: string) => {
    return password.length < 6;
}

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        // Валидация
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        if (!checkEmail(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        if (checkPassword(password)) {
            return NextResponse.json(
                { error: 'Password must be at least 6 characters' },
                { status: 400 }
            );
        }

        // Инициализируем БД (создаст таблицу если её нет)
        const db = await initDB();
        
        // Проверяем, существует ли пользователь
        const existingUser = await db.get(
            'SELECT * FROM users WHERE email = ?',
            [email.toLowerCase()]
        );

        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 400 }
            );
        }

        const saltRounds = 10;
        // хешируем пароль
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Создаем пользователя
        const result = await db.run(
            `INSERT INTO users (email, password_hash, role, created_at)
             VALUES (?, ?, ?, datetime('now'))`,
            [email.toLowerCase(), hashedPassword, 'user']
        );

        // Получаем созданного пользователя 
        const newUser = await db.get(
            'SELECT id, email, role, created_at FROM users WHERE id = ?',
            [result.lastID]
        );

        return NextResponse.json({
            success: true,
            message: 'User registered successfully',
            user: newUser
        }, { status: 201 });
        
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}