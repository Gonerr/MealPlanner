import { initDB } from '../lib/db/db';
import bcrypt from 'bcryptjs';

async function main() {
    console.log('Initializing database...');
    const db = await initDB();
    
    // Проверяем, есть ли тестовый пользователь
    const testUser = await db.get('SELECT * FROM users WHERE email = ?', ['user@example.com']);
    
    if (!testUser) {
        const hashedPassword = await bcrypt.hash('hahah23', 10);
        await db.run(
            `INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)`,
            ['user@example.com', hashedPassword, 'user']
        );
        console.log('✅ Test user created: user@example.com / hahah23');
    } else {
        console.log('✅ Test user already exists');
    }
    
    // Проверяем количество пользователей
    const count = await db.get('SELECT COUNT(*) as count FROM users');
    console.log(`📊 Total users: ${count.count}`);
    
    await db.close();
    console.log('✅ Database initialization complete!');
}

main().catch(console.error);