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

interface Ingredient {
    id: number;
    name: string;
    description: string;
    category: string;
    is_available: number;
}

interface RecipeIngredient {
    recipe_id: number;
    ingredient_id: number;
    quantity?: string;
    unit?: string;
}

// Инициализируем таблицы и возвращаем подключение
export const initDB = async () => {
    const db = await openDB();

    // Таблица категорий
await db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT,
        color TEXT DEFAULT 'gray',
        icon TEXT,
        display_order INTEGER DEFAULT 0,
        is_active INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT DEFAULT 'user',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS recipes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            name TEXT NOT NULL,
            description TEXT,
            price REAL,
            category_slug TEXT,  -- ← вместо category TEXT
            preparation_time INTEGER,
            is_available INTEGER DEFAULT 1,
            is_chef_special INTEGER DEFAULT 0,
            calories INTEGER,
            image_url TEXT,
            meal_type TEXT DEFAULT 'lunch',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL,
            FOREIGN KEY (category_slug) REFERENCES categories (slug) ON DELETE SET NULL
        )
    `);

    await db.exec(
        `
        CREATE TABLE IF NOT EXISTS ingredients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            category TEXT,
            is_available INTEGER DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )

        CREATE TABLE IF NOT EXISTS recipe_ingredients (
            recipe_id INTEGER,
            ingredient_id INTEGER,
            quantity TEXT,
            unit TEXT,
            PRIMARY KEY (recipe_id, ingredient_id),
            FOREIGN KEY (recipe_id) REFERENCES recipes (id) ON DELETE CASCADE,
            FOREIGN KEY (ingredient_id) REFERENCES ingredients (id) ON DELETE CASCADE
        )
    `);

    console.log('✅ Database initialized with users table');

    await seedTestData(db);
    return db;
};

// Функция для добавления тестовых данных
async function seedTestData(db: any) {
    // Проверяем, есть ли категории
    const categoryCount = await db.get('SELECT COUNT(*) as count FROM categories');
    
    if (categoryCount.count === 0) {
        console.log('Seeding categories...');
        
        const categories = [
            { name: 'Все рецепты', slug: 'all', color: 'gray', display_order: 0, is_active: 1 },
            { name: 'Салаты', slug: 'salads', color: 'green', display_order: 1, is_active: 1 },
            { name: 'Супы', slug: 'soups', color: 'blue', display_order: 2, is_active: 1 },
            { name: 'Основные блюда', slug: 'main', color: 'amber', display_order: 3, is_active: 1 },
            { name: 'Десерты', slug: 'desserts', color: 'pink', display_order: 4, is_active: 1 },
            { name: 'Перекусы', slug: 'snacks', color: 'purple', display_order: 5, is_active: 1 },
            { name: 'Напитки', slug: 'drinks', color: 'cyan', display_order: 6, is_active: 1 },
            { name: 'Особые рецепты', slug: 'specials', color: 'rose', display_order: 7, is_active: 1 }
        ];
        
        for (const cat of categories) {
            await db.run(
                `INSERT INTO categories (name, slug, color, display_order, is_active) 
                 VALUES (?, ?, ?, ?, ?)`,
                [cat.name, cat.slug, cat.color, cat.display_order, cat.is_active]
            );
        }
        
        console.log('Categories seeded');
    }

    // Проверяем, есть ли рецепты
    const recipeCount = await db.get('SELECT COUNT(*) as count FROM recipes');
    
    if (recipeCount.count === 0) {
        console.log('Seeding test recipes...');
        
        // Добавляем ингредиенты
        const ingredients:Omit<Ingredient, 'id'>[] = [
            { name: 'Куриное филе', category: 'meat', description: 'Свежее куриное филе', is_available: 1 },
            { name: 'Картофель', category: 'vegetable', description: 'Молодой картофель', is_available: 1 },
            { name: 'Сыр', category: 'dairy', description: 'Твердый сыр', is_available: 1 },
            { name: 'Говядина', category: 'meat', description: 'Мраморная говядина', is_available: 1 },
            { name: 'Шоколад', category: 'other', description: 'Темный шоколад', is_available: 1 },
            { name: 'Мята', category: 'vegetable', description: 'Свежая мята', is_available: 1 },
            { name: 'Лайм', category: 'vegetable', description: 'Свежий лайм', is_available: 1 },
        ];
        
        for (const ing of ingredients) {
            await db.run(
                'INSERT INTO ingredients (name, description, category, is_available) VALUES (?, ?, ?)',
                [ing.name, ing.description, ing.category]
            );
        }
        
        // Получаем ID ингредиентов
        const allIngredients: Ingredient[] = await db.all('SELECT id, name FROM ingredients');
        
        const ingMap = new Map<string, number>();
        allIngredients.forEach((ing: Ingredient) => {
            ingMap.set(ing.name, ing.id);
        });
        
        // Добавляем рецепты
        const recipes = [
            {
                name: 'Курица по-французски',
                description: 'Запеканка из нескольких слоев',
                price: 450,
                category: 'main',
                preparation_time: 55,
                is_available: 1,
                is_chef_special: 1,
                calories: 320,
                meal_type: 'lunch',
                ingredients: ['Куриное филе', 'Картофель', 'Сыр']
            },
            {
                name: 'Стейк из говядины',
                description: 'Сочный стейк с овощами гриль',
                price: 890,
                category: 'main',
                preparation_time: 25,
                is_available: 1,
                is_chef_special: 0,
                calories: 650,
                meal_type: 'dinner',
                ingredients: ['Говядина']
            },
            {
                name: 'Шоколадный фондан',
                description: 'Теплый шоколадный десерт с мороженым',
                price: 350,
                category: 'desserts',
                preparation_time: 20,
                is_available: 0,
                is_chef_special: 1,
                calories: 420,
                meal_type: 'dessert',
                ingredients: ['Шоколад']
            },
            {
                name: 'Мохито',
                description: 'Освежающий коктейль с мятой и лаймом',
                price: 300,
                category: 'drinks',
                preparation_time: 5,
                is_available: 1,
                is_chef_special: 0,
                calories: 150,
                meal_type: 'drinks',
                ingredients: ['Мята', 'Лайм']
            }
        ];
        
        for (const recipe of recipes) {
            const result = await db.run(
                `INSERT INTO recipes (
                    name, description, price, category, preparation_time, 
                    is_available, is_chef_special, calories, meal_type
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    recipe.name, recipe.description, recipe.price, recipe.category,
                    recipe.preparation_time, recipe.is_available, recipe.is_chef_special,
                    recipe.calories, recipe.meal_type
                ]
            );
            
            const recipeId = result.lastID;
            
            // Добавляем связи с ингредиентами
            for (const ingName of recipe.ingredients) {
                const ingredientId = ingMap.get(ingName);
                if (ingredientId) {
                    await db.run(
                        'INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES (?, ?)',
                        [recipeId, ingredientId]
                    );
                }
            }
        }
        
        console.log('✅ Test recipes seeded');
    }
}