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