import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

// Путь к файлу базы данных
const DB_PATH = path.join(process.cwd(), 'database.db');

// Инициализируем базу данных
export const openDB = async () => {
    return open({
        filename: DB_PATH,
        driver: sqlite3.Database
    });
}

// Инициализируем таблицы и возвращаем подключение
export const initDB = async () => {
    const db = await openDB();

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT DEFAULT 'user',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    console.log('✅ Database initialized with users table');
    return db;
};