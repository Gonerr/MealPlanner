import { withAuthHandler } from "@/lib/api-helper";
import { MealPlanRepository } from "@/lib/db/meal-plan.repository";
import { NextResponse } from "next/server";

// Получение меню на день
export const GET = withAuthHandler(async (req, { user, db }) => {
  console.log("User ID from session:", user.userId);

  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "Date required" }, { status: 400 });
  }

  console.log("Параметр id и date в GET запросе: ", user.userId, date);

  const repository = new MealPlanRepository(db);
  const result = await repository.getByDate(user.userId, date);

  return NextResponse.json(result);
});

// Добавление блюда + получение/создание меню на день
export const POST = withAuthHandler(async (req, { user, db }) => {
  const { date, recipeId, mealType, grams, price } = await req.json();
  console.log(
    "Запустился метод POST с данными:",
    date,
    recipeId,
    mealType,
    grams,
    price
  );

  const repository = new MealPlanRepository(db);
  await repository.addDish(user.userId, date, recipeId, mealType, grams, price);

  return NextResponse.json({ success: true });
});

// Удаление блюда из меню на день. Если блюд на день не остается - удалять ли меню?
export const DELETE = withAuthHandler(async (req, { user, db }) => {
  const { menuItemId } = await req.json();

  if (!menuItemId) {
    return NextResponse.json({ error: "menuItenId required" }, { status: 400 });
  }

  const repository = new MealPlanRepository(db);
  await repository.removeDish(user.userId, menuItemId);
  return NextResponse.json({ success: true });
});
