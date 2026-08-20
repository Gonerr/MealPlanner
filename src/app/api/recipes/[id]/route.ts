// GET /api/recipes/[id]/route.ts
import { withAuthHandler } from "@/lib/api-helper";
import { RecipesRepository } from "@/lib/db/recipes.repository";
import { NextResponse } from "next/server";

// GET /api/recipes/:id - получить рецепт по ID
export const GET = withAuthHandler(async (request, { db, params }) => {
  const id = parseInt(params.id);
  const repository = new RecipesRepository(db);
  const recipe = await repository.getById(id);

  if (!recipe) {
    return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
  }
  return NextResponse.json({ recipe });
}, false);

// PUT - /api/recipes/:id - обновить рецепт
export const PUT = withAuthHandler(async (request, { db, params }) => {
  const id = parseInt(params.id);
  const repository = new RecipesRepository(db);
  const data = await request.json();

  const recipe = await repository.update(data, id);

  return NextResponse.json({
    success: true,
    message: "Recipe updated successfully",
    recipe,
  });
}, true);

// DELETE /api/recipes/:id - удалить рецепт
export const DELETE = withAuthHandler(async (request, { db, params }) => {
  const id = parseInt(params.id);
  const repository = new RecipesRepository(db);

  await repository.delete(id);

  return NextResponse.json({
    success: true,
    message: "Recipe deleted successfully",
  });
}, true);
