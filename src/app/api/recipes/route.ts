import { withAuthHandler } from "@/lib/api-helper";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { initDB } from "@/lib/db/db";
import { RecipesCRUD } from "@/lib/db/recipes-crud";
import { update } from "lodash";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// GET /api/recipes - получить все рецепты
export const GET = withAuthHandler(async (request, { db }) => {
    const recipesCRUD = new RecipesCRUD(db);
    const recipes = await recipesCRUD.getAll();
    
    return NextResponse.json({recipes});
}, false); // false - не требует прав админа


// Добавление нового рецепта - /api/recipes/
export const POST = withAuthHandler(async (request, { db, user }) => {
    const recipesCRUD = new RecipesCRUD(db);
    const data = await request.json();

    const recipe = await recipesCRUD.create(parseInt(user.userId),data);

    return NextResponse.json({
        success: true,
        message: 'Recipe created successfully',
        recipe
    }, { status: 201 });
}, true) // требует прав админа


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
