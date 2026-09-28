import { isValidDate, isValidHouseholdId } from "@/features/helpers";
import { withAuthHandler } from "@/lib/api-helper";
import { HouseholdsRepository } from "@/lib/db/households.repository";
import { MealPlanRepository } from "@/lib/db/meal-plan.repository";
import { RecipesRepository } from "@/lib/db/recipes.repository";
import { NextResponse } from "next/server";

// Получение меню на день
export const GET = withAuthHandler(async (req, { user, db }) => {
  const { searchParams } = new URL(req.url);

  const householdId = Number(searchParams.get("householdId"));
  const date = searchParams.get("date");

  console.log("User ID from session:", user.userId);

  if (!isValidHouseholdId(householdId) || !isValidDate(date)) {
    return NextResponse.json(
      { error: "Valid householdId and date are required" },
      { status: 400 }
    );
  }

  const householdsRepository = new HouseholdsRepository(db);

  const isMember = await householdsRepository.isMember(
    householdId,
    Number(user.userId)
  );

  if (!isMember) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (!date) {
    return NextResponse.json({ error: "Date required" }, { status: 400 });
  }

  console.log("Параметр id и date в GET запросе: ", user.userId, date);

  const repository = new MealPlanRepository(db);
  const result = await repository.getByDate(householdId, date);

  return NextResponse.json(result);
});

// Добавление блюда + получение/создание меню на день
export const POST = withAuthHandler(async (req, { user, db }) => {
  const { householdId, date, recipeId, mealType, grams, price } =
    await req.json();
  console.log(
    "Запустился метод POST с данными:",
    householdId,
    date,
    recipeId,
    mealType,
    grams,
    price
  );

  if (!isValidHouseholdId(householdId)) {
    return NextResponse.json(
      { error: "Valid householdId is required" },
      { status: 400 }
    );
  }

  if (!Number.isSafeInteger(recipeId) || recipeId <= 0) {
    return NextResponse.json(
      { error: "Valid recipeId is required" },
      { status: 400 }
    );
  }

  const householdsRepository = new HouseholdsRepository(db);

  const isMember = await householdsRepository.isMember(
    householdId,
    Number(user.userId)
  );

  if (!isMember) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  // Проверяем, что рецепт вообще существует
  const recipesRepository = new RecipesRepository(db);
  const recipe = await recipesRepository.getById(recipeId);

  if (!recipe) {
    return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
  }

  const repository = new MealPlanRepository(db);

  await repository.addDish(householdId, date, recipeId, mealType, grams, price);

  return NextResponse.json({ success: true });
});

// Удаление блюда из меню на день. Если блюд на день не остается - удалять ли меню?
export const DELETE = withAuthHandler(async (req, { user, db }) => {
  const { householdId, menuItemId } = await req.json();

  if (!isValidHouseholdId(householdId)) {
    return NextResponse.json(
      { error: "Valid householdId is required" },
      { status: 400 }
    );
  }

  const householdsRepository = new HouseholdsRepository(db);

  const isMember = await householdsRepository.isMember(
    householdId,
    Number(user.userId)
  );

  if (!isMember) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (!menuItemId) {
    return NextResponse.json({ error: "menuItenId required" }, { status: 400 });
  }

  const repository = new MealPlanRepository(db);
  await repository.removeDish(householdId, menuItemId);
  return NextResponse.json({ success: true });
});
