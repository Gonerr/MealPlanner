import { withAuthHandler } from "@/lib/api-helper"
import { MenuPlanCRUD } from "@/lib/db/menuPlan-crud";
import { NextResponse } from "next/server";

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

export const POST = withAuthHandler(async (req, {user, db}) => {
    const {date, recipeId} = await req.json();

    const menu = new MenuPlanCRUD(db);
    await menu.addDish(user.id, date, recipeId);

    return NextResponse.json({success: true});
})

export const DELETE = withAuthHandler(async (req, {user, db}) => {
    const {date, recipeId} = await req.json();

    const menu = new MenuPlanCRUD(db);
    await menu.removeDish(user.id, date,recipeId);
    return NextResponse.json({success: true})
})
