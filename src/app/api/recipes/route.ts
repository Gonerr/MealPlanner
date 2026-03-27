import { verifyAccessToken } from "@/lib/auth/jwt";
import { initDB } from "@/lib/db/db";
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
                recipe.ingredient_ids.split(',').map((id, index) => ({
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

export async function POST(request: NextRequest) {
    try{ 
        // проверяем авторизацию
        const cookieStore = await cookies();
        const token = cookieStore.get('accessToken')?.value;

        if (!token) {
            return NextResponse.json(
                {error: 'Unauthorized'},
                {status: 401}
            );
        }

        const payload = await verifyAccessToken(token)
    }
}