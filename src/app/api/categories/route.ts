import { safeDB, withAuthHandler } from "@/lib/api-helper";
import { initDB } from "@/lib/db/db";
import { error } from "console";
import { request } from "http";
import { NextResponse } from "next/server";

// GET /api/categories - получить все категории
export async function GET() {
    try {
        const db = await initDB();
        const safeDb = new safeDB(db);
        
        const categories = await safeDb.all(`
            SELECT * FROM categories 
            WHERE is_active = 1 
            ORDER BY display_order ASC
        `);
        
        return NextResponse.json({ categories });
        
    } catch (error) {
        console.error('Get categories error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// POST /api/categories - создать категорию
export const POST = withAuthHandler(async (request, {db, user}) => {
    const safeDb = new safeDB(db);
    const { name, slug, color, description, icon, display_order } = await request.json();
    
    // Валидация
    if (!name || !slug) {
        return NextResponse.json(
            { error: 'Name and slug are required' },
            { status: 400 }
        );
    }

    // Проверяем уникальность slug
    const existing = await safeDb.get(
        'SELECT * FROM categories WHERE slug = ?',
        [slug]
    );
    
    if (existing) {
        return NextResponse.json(
            { error: 'Category with this slug already exists' },
            { status: 409 }
        );
    }

    // Определяем порядок отображения
    let order = display_order;
    if (order === undefined) {
        const maxOrder = await safeDb.get(
            'SELECT MAX(display_order) as max_order FROM categories'
        );
        order = (maxOrder?.max_order || 0) + 1;
    }
    
    // Создаем категорию
    const result = await safeDb.run(`
        INSERT INTO categories (name, slug, description, color, icon, display_order, is_active)
        VALUES (?, ?, ?, ?, ?, ?, 1)
    `, [name, slug, description || null, color || 'gray', icon || null, order]);
    
    // Получаем созданную категорию
    const newCategory = await safeDb.get(
        'SELECT * FROM categories WHERE id = ?',
        [result.lastID]
    );

    return NextResponse.json({
        success: true,
        message: 'Category created successfully',
        category: newCategory
    }, { status: 201 });
}, true)

// PUT - /api/categories/:id - обновить категорию
export const PUT = withAuthHandler(async (request, {db, params}) => {
    const safeDb = new safeDB(db);
    const {name, slug, description, color, icon, display_order, is_active } = await request.json();
    const id = parseInt(params?.id);

    if(!id) {
        return NextResponse.json(
            {error:'Category ID is required'},
            {status: 400}
        );
    }

    // Проверяем уникальность slug
    const existing = await safeDb.get(
        'SELECT * FROM categories WHERE id = ?',
        [id]
    );

    if (existing) {
        return NextResponse.json(
            { error: 'Category already exists' },
            { status: 409 }
        );
    }

    // Обновляем категорию
    await safeDb.run(`
        UPDATE categories SET
            name = COALESCE(?, name),
            slug = COALESCE(?, slug),
            description = COALESCE(?, description),
            color = COALESCE(?, color),
            icon = COALESCE(?, icon),
            display_order = COALESCE(?, display_order),
            is_active = COALESCE(?, is_active),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    `, [
        name, slug, description, color, icon, 
        display_order, is_active !== undefined ? (is_active ? 1 : 0) : undefined,
        id
    ]);

    // Получаем обновленную категорию
    const updatedCategory = await safeDb.get(
        'SELECT * FROM categories WHERE id = ?',
        [id]
    );
    
    return NextResponse.json({
        success: true,
        message: 'Category updated successfully',
        category: updatedCategory
    });
}, true)

// DELETE /api/categories/:id - удалить категорию (только для админов)
export const DELETE = withAuthHandler(async (request, { db, params }) => {
    const safeDb = new safeDB(db);
    const id = parseInt(params?.id);
    
    if (!id) {
        return NextResponse.json(
            { error: 'Category ID is required' },
            { status: 400 }
        );
    }
    
    // Проверяем существование категории
    const existing = await safeDb.get(
        'SELECT * FROM categories WHERE id = ?',
        [id]
    );
    
    if (!existing) {
        return NextResponse.json(
            { error: 'Category not found' },
            { status: 404 }
        );
    }
    
    // Проверяем, есть ли рецепты с этой категорией
    const recipesCount = await safeDb.get(
        'SELECT COUNT(*) as count FROM recipes WHERE category_slug = ?',
        [existing.slug]
    );
    
    if (recipesCount.count > 0) {
        return NextResponse.json(
            { 
                error: 'Cannot delete category with existing recipes',
                message: `This category is used in ${recipesCount.count} recipe(s)`
            },
            { status: 409 }
        );
    }
    
    // Удаляем категорию
    await safeDb.run('DELETE FROM categories WHERE id = ?', [id]);
    
    return NextResponse.json({
        success: true,
        message: 'Category deleted successfully'
    });
    
}, true);