import { verifyAccessToken } from "@/lib/auth/jwt";
import { initDB } from "@/lib/db/db";
import { update } from "lodash";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// GET /api/recipes - получить все рецепты
export async function GET(request: NextRequest) {
    try{
        const db = await initDB();
        
        const recipes = await db.all(`
            SELECT 
                r.*,
                GROUP_CONCAT(i.id) as ingredient_ids,
                GROUP_CONCAT(i.name) as ingredient_names
            FROM recipes r
            LEFT JOIN recipe_ingredients ri ON r.id = ri.recipe_id
            LEFT JOIN ingredients i ON ri.ingredient_id = i.id
            GROUP BY r.id
            ORDER BY r.created_at DESC
        `);

         // Форматируем ингредиенты
        const formattedRecipes = recipes.map(recipe => ({
            id: recipe.id,
            name: recipe.name,
            description: recipe.description,
            price: recipe.price,
            category: recipe.category,
            preparationTime: recipe.preparation_time,
            isAvailable: recipe.is_available === 1,
            isChefSpecial: recipe.is_chef_special === 1,
            calories: recipe.calories,
            imageUrl: recipe.image_url,
            mealType: recipe.meal_type,
            ingredients: recipe.ingredient_ids ? 
                recipe.ingredient_ids.split(',').map((id:any, index:any) => ({
                    id: parseInt(id),
                    name: recipe.ingredient_names.split(',')[index]
                })) : [],
            createdAt: recipe.created_at,
            updatedAt: recipe.updated_at
        }));
        
        return NextResponse.json({ recipes: formattedRecipes });
    }catch (error) {
        console.error('Get recipes error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}


// PUT - /api/recipes/:id - обновить рецепт
export default async function PUT(request: NextRequest,
    {params}: {params: {id: string} }
) {
    // Проверяем авторизацию
    try{
        const cookieStore = await cookies();
        const token = cookieStore.get('accessToken')?.value;

        if (!token){
            return NextResponse.json(
            { error: 'Unauthorized user' },
            { status: 401 }
            );
        }

        const payload = await verifyAccessToken(token);
        if (!payload || payload.role !== 'admin'){
            return NextResponse.json(
            { error: 'Forbitten - Admin only' },
            { status: 401 }
            );
        }

        const id = parseInt(params.id);
        const updates = await request.json();
        const db = await initDB();


        // Проверяем существует ли обновляемый рецепт
        const existing = await db.get(`SELECT * FROM recipes WHERE id = ?`, [id]);
        if (!existing) {
            return NextResponse.json(
                {error: 'Recipe not found'},
                {status: 404}
            )
        }

        // Обновляем, если рецепт существует
        await db.run(`
            UPDATE recipes
            SET 
                name = COALESCE(?, name),
                description = COALESCE(?, description),
                price = COALESCE(?, price),
                category = COALESCE(?, category),
                preparation_time = COALESCE(?, preparation_time),
                is_available = COALESCE(?, is_available),
                is_chef_special = COALESCE(?, is_chef_special),
                calories = COALESCE(?, calories),
                meal_type = COALESCE(?, meal_type),
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
            `), [
                updates.name, updates.description, updates.price, updates.category,
                updates.preparationTime, updates.isAvailable ? 1 : 0, 
                updates.is_chef_special ? 1 : 0, updates.calories, updates.mealType, id
            ]

        return NextResponse.json({success: true})
    } catch (error) {
        console.error('Update recipe error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// DELETE /api/recipes/:id - удалить рецепт
export async function DELETE(request: NextRequest,
    {params}: {params: {id:string} }
) {
    try {
        // Проверка авторизации
        const cookieStore = await cookies();
        const token = cookieStore.get('accessToken')?.value;

        if (!token){
            return NextResponse.json(
            { error: 'Unauthorized user' },
            { status: 401 }
            );
        }

        const payload = await verifyAccessToken(token);
        if (!payload || payload.role !== 'admin'){
            return NextResponse.json(
            { error: 'Forbitten - Admin only' },
            { status: 401 }
            );
        }

        const id = parseInt(params.id);
        const db = await initDB();

        // проверяем, существует ли вообще данный рецепт
        const result = await db.get(`
            DELETE FROM recipes WHERE id = ?`, [id]);
        if (result.changes === 0) {
            return NextResponse.json(
                {error: 'Recipe not found'},
                {status: 404}
            )
        }

        return NextResponse.json({success: true})
    } catch (error) {
        console.error('Delete recipe error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

// Добавление нового рецепта - /api/recipes/
export async function POST(request: NextRequest) {
    // TODO - обязательно проверять. существуют ли ингредиенты и если нет - сначала добавлять их
    try{ 
        // Проверка авторизации
        const cookieStore = await cookies();
        const token = cookieStore.get('accessToken')?.value;

        if (!token){
            return NextResponse.json(
            { error: 'Unauthorized user' },
            { status: 401 }
            );
        }

        const payload = await verifyAccessToken(token);
        if (!payload || payload.role !== 'admin'){
            return NextResponse.json(
            { error: 'Forbitten - Admin only' },
            { status: 401 }
            );
        }

        const userId = payload.userId;
        const newRecipe = await request.json();
        const db = await initDB();

        const existing = await db.get(`
            SELECT * FROM recipes WHERE name = ?`, [newRecipe.id]);
        if (existing) {
            return NextResponse.json(
                {error: 'Recipe exists already'},
                {status: 404}
            )
        }

        const result = await db.run(`
            INSERT INTO recipes(
                user_id, 
                name, 
                description, 
                price, 
                category, 
                preparation_time,
                is_available,
                is_chef_special, 
                calories, 
                meal_type
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
                userId,
                newRecipe.name,
                newRecipe.description || '',
                newRecipe.price || 0,
                newRecipe.category,
                newRecipe.preparationTime || 0,
                newRecipe.isAvailable !== undefined? (newRecipe.isAvailable ? 1 : 0): 1,
                newRecipe.isChefSpecial !== undefined? (newRecipe.isChefSpecial ? 1 : 0): 1,
                newRecipe.calories || 0,
                newRecipe.mealType || 'lunch'
        ]);

        const recipeId = result.lastID;

        // Добавляем связи с ингредиентами, если они переданы
        const ingredientIds = newRecipe.ingredientIds;
        if (ingredientIds || ingredientIds.length > 0){
            for (let id of ingredientIds){
                await db.run(
                    `INSERT INTO recipe_ingredients (
                        recipe_id, 
                        ingredient_id)
                    VALUES (?, ?)`,
                    [recipeId, id]
                );
            }
        }

        const recipe = await db.get(`SELECT * FROM recipes WHERE id = ?`, [recipeId]);
        return NextResponse.json({
            success: true,
            message: 'Recipe created successfully',
            recipe: {
                id: recipeId,
                name: recipe.name,
                description: recipe.description,
                price: recipe.price,
                category: recipe.category,
                preparationTime: recipe.preparation_time,
                isAvailable: recipe.is_available === 1,
                isChefSpecial: recipe.is_chef_special === 1,
                calories: recipe.calories,
                mealType: recipe.meal_type,
                createdBy: userId
            }
        }, {status: 201});

    } catch (error) {
        console.error('Create recipe error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}