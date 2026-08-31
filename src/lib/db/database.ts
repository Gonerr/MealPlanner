import path from "path";
import { open } from "sqlite";
import sqlite3 from "sqlite3";
import { seedTestData } from "./seed";

const DB_PATH = path.join(process.cwd(), "database.db");

export const openDB = async () => {
  return open({
    filename: DB_PATH,
    driver: sqlite3.Database,
  });
};

export const initDB = async () => {
  const db = await openDB();

  // Включаем поддержку внешних ключей
  await db.exec("PRAGMA foreign_keys = ON");

  // 1. Создаем таблицу users
  await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            name TEXT,
            role TEXT DEFAULT 'user',
            is_active INTEGER DEFAULT 1,
            last_login DATETIME,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

  // 2. Создаем таблицу categories
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
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

  // 3. Создаем таблицу ingredients
  await db.exec(`
        CREATE TABLE IF NOT EXISTS ingredients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            category TEXT,
            is_available INTEGER DEFAULT 1,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            price REAL,
            calories INTEGER
        )
    `);

  // 4. Создаем таблицу recipes
  await db.exec(`
        CREATE TABLE IF NOT EXISTS recipes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            name TEXT NOT NULL,
            description TEXT,
            price REAL,
            category_slug TEXT,
            preparation_time INTEGER,
            is_available INTEGER DEFAULT 1,
            is_archived INTEGER DEFAULT 0,
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

  // 5. Создаем связующую таблицу
  await db.exec(`
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

  // await db.exec(`
  //    CREATE TABLE IF NOT EXISTS menu_plan (
  //         id INTEGER PRIMARY KEY AUTOINCREMENT,
  //         user_id INTEGER NOT NULL,
  //         date TEXT NOT NULL,
  //         recipe_id INTEGER NOT NULL,
  //         created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  //         UNIQUE(user_id, date, recipe_id),

  //         FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  //         FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
  //    )
  // `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS menu_days (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        owner_id INTEGER,
        date TEXT NOT NULL,
        UNIQUE(owner_id, date),
        FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
    )
    `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS menu_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        menu_day_id INTEGER NOT NULL,
        recipe_id INTEGER NOT NULL,
        meal_type TEXT,
        grams INTEGER,
        custom_price REAL,
        FOREIGN KEY (menu_day_id) REFERENCES menu_days(id) ON DELETE CASCADE,
        FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
    )
    `);

  // Личные и семейные пространства
  await db.exec(`
    CREATE TABLE IF NOT EXISTS households (
        id INTEGER PRIMARY KEY AUTOINCREMENT,

        name TEXT NOT NULL,
        
        type TEXT NOT NULL DEFAULT 'family'
            CHECK (type IN ('personal', 'family')),

        created_by INTEGER NOT NULL,

        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (created_by)
            REFERENCES users(id)
            ON DELETE CASCADE
    );
`);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS households_members (
        household_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,

        role TEXT NOT NULL DEFAULT 'member',
        joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,

        PRIMARY KEY(household_id, user_id),

        FOREIGN KEY (household_id)
            REFERENCES households(id)
            ON DELETE CASCADE,

        FOREIGN KEY (user_id)
            REFERENCES users(id)
            ON DELETE CASCADE       
    );
`);

  await db.exec(`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_personal_household_owner
    ON households(created_by)
    WHERE type = 'personal'
`);

  await db.exec(`
CREATE TABLE IF NOT EXISTS households_invites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    household_id INTEGER NOT NULL,
    email TEXT NOT NULL,
    token TEXT UNIQUE NOT NULL,
    
    status TEXT DEFAULT 'pending',

    created_by INTEGER NOT NULL,
    expires_at DATETIME,

    FOREIGN KEY (household_id)
        REFERENCES households(id)
        ON DELETE CASCADE
);
`);

  await db.exec(`
CREATE TABLE IF NOT EXISTS pantry_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    household_id INTEGER NOT NULL,
    ingredient_id INTEGER NOT NULL,

    quantity REAL NOT NULL DEFAULT 0,
    unit TEXT NOT NULL,

    updated_by INTEGER,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(household_id, ingredient_id, unit),

    FOREIGN KEY (household_id)
        REFERENCES households(id)
        ON DELETE CASCADE,

    FOREIGN KEY (ingredient_id) 
        REFERENCES ingredients(id)
        ON DELETE CASCADE,

    FOREIGN KEY (updated_by)
        REFERENCES users(id)
        ON DELETE SET NULL
)

`);

  try {
    await db.exec(
      `ALTER TABLE recipes ADD COLUMN is_archived INTEGER DEFAULT 0`
    );
  } catch (error: any) {
    if (!String(error.message).includes("duplicate column name")) {
      throw error;
    }
  }

  console.log("Database initialized with all tables");

  // Добавляем тестовые данные
  await seedTestData(db);

  return db;
};
