import { withAuthHandler } from "@/lib/api-helper"
import { MenuPlanCRUD } from "@/lib/db/menuPlan-crud";
import { NextResponse } from "next/server";


// Получение меню на день
export const GET = withAuthHandler(async (req, {user, db}) => {
    const {searchParams} = new URL (req.url);
    const date = searchParams.get("date");

    if (!date){
        return NextResponse.json({error: "Date required"}, {status: 400});
    }

    const menu = new MenuPlanCRUD(db);
    const result = await menu.getByDate(user.id, date);

    return NextResponse.json(result);
})

// Добавление блюда + получение/создание меню на день
export const POST = withAuthHandler(async (req, {user, db}) => {
    const {date, recipeId, mealType, grams, price} = await req.json();

    const menu = new MenuPlanCRUD(db);
    await menu.addDish(user.id, date, recipeId, mealType, grams, price);

    return NextResponse.json({success: true});
})

// Удаление блюда из меню на день. Если блюд на день не остается - удалять ли меню?
export const DELETE = withAuthHandler(async (req, {user, db}) => {
    const {date, recipeId, menuDayId} = await req.json();

    const menu = new MenuPlanCRUD(db);
    await menu.removeDish(date, recipeId, menuDayId);
    return NextResponse.json({success: true})
})

