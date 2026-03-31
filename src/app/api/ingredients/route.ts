import { safeDB, withAuthHandler } from "@/lib/api-helper"
import { request } from "http";
import { NextResponse } from "next/server";

// GET /api/ingredients - получить все ингредиенты 
export const GET = withAuthHandler(async (request, {db}) => {
    const safeDb = new safeDB(db);

    const ingredients = await safeDb.all(`
        SELECT * FROM ingredients
        ORDER BY name ASC
        `);

    return NextResponse.json({ingredients});
}, false); // false - не требует админа

// POST /api/ingredients - создать ингредиент
export const POST = withAuthHandler(async (request, {db, user}) => {
    const safeDb = new safeDB(db);
    const {name, description, category, isAvailable} = await request.json();

    // Валидация
    if (!name) {
        return NextResponse.json(
            {error: 'Name is required'},
            {status: 400}
        );
    }

    const existing = await safeDb.get(
        'SELECT * FROM ingredients WHERE name = ?', [name]
    );

    if (existing) {
        return NextResponse.json(
            {error: 'Ingredient with this name already exists'},
            {status: 409}
        )
    }


    // создаем ингредиент
    const result = await safeDb.run(`
        INSERT INTO ingredients (name, descriptionm category, is_available)
        VALUE (?, ?, ?, ?)
        `, 
    [name, description || null, category || 'other', isAvailable !== undefined ? (isAvailable ? 1 : 0) : 1]);

    const newIngredient = await safeDb.get(
        'SELECT * FROM ingredients WHERE id = ?', [result.lastID]
    );

    return NextResponse.json({
        success: true,
        message: 'Ingredient created successfully',
        ingredient: newIngredient
    },{status: 201})

}, true);



// PUT /api/ingredients - обновить ингредиет 
export const PUT = withAuthHandler(async (request, {db}) => {
    const safeDb = new safeDB(db);
    const {id, name, description, category, isAvailable} = await request.json();
    
    if (!id) {
        return NextResponse.json(
            {error: 'ID is required'},
            {status: 409}
        )
    }

    const existing = await safeDb.get(
        'SELECT * FROM ingredients WHERE name = ?', [name]
    );

    if (!existing) {
        return NextResponse.json(
            {error: 'Ingredient not found'},
            {status: 404}
        )
    }

    await safeDb.run(`
        UPDATE ingredients SET
            name = COALESCE(?, name),
            description = COALESCE(?, description),
            category = COALESCE(?, category),
            is_available = COALESCE(?, is_available),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
        `, [name, description, category, isAvailable !== undefined ?(isAvailable ? 1 : 0) : undefined, id]);

    
    const updatedIngredient = await safeDb.get(
       'SELECT * FROM ingredients WHERE id = ?', [id]
    );

    return NextResponse.json({
        success: true,
        message: 'Ingredient created successfully',
        ingredient: updatedIngredient
    })

}, true); // false - не требует админа

export const DELETE = withAuthHandler(async (request, {db}) => {
    const safeDb = new safeDB(db);
    const {searchParams} = new URL(request.url);
    const id = parseInt(searchParams.get('id') || '');

    if (!id) {
        return NextResponse.json(
            {error: 'ID is required'},
            {status: 409}
        )
    }

    // Проверяем используется ли ингредиент в рецептах
    const usedInRecipes = await safeDb.get(`
        SELECT COUNT(*) as count FROM recipe_ingredients WHERE ingredient_id = ?
        `, [id]);
    
        if (usedInRecipes.count > 0) {
            return NextResponse.json({
                 error: 'Cannot delete ingredient used in recipes',
                message: `This ingredient is used in ${usedInRecipes.count} recipe(s)`
            },
            {status: 400})
        }

        //удаляем ингредиент
        const result = db.run(`
            DELETE FROM ingredients WHERE id = ?`, [id]);
        
        if (result.changes === 0) {
        return NextResponse.json(
            { error: 'Ingredient not found' },
            { status: 404 }
        );
    }
    
    return NextResponse.json({
        success: true,
        message: 'Ingredient deleted successfully'
    });
}, true)